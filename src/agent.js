import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';

const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT = 'https://conduit.productionready.io/api';

const encode = encodeURIComponent;
const responseBody = res => res.body;

let token = null;
const tokenPlugin = req => {
  if (token) {
    req.set('authorization', `Token ${token}`);
  }
}

const requests = {
  del: url =>
    superagent.del(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  get: url =>
    superagent.get(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
  put: (url, body) =>
    superagent.put(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody),
  post: (url, body) =>
    superagent.post(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody),
  setpost: (url, body) =>
    superagent.post(`${url}`, body).use(tokenPlugin).then(responseBody),
  set: (url, body) => 
    superagent.get(`${url}`, body).use(tokenPlugin).then(responseBody)
};

const Auth = {
  current: (token) =>
    requests.setpost('https://8xk6c6vlz2.execute-api.ap-northeast-2.amazonaws.com/userinfo', { "token": token}),
  login: (email, password) =>
    requests.setpost('https://8xk6c6vlz2.execute-api.ap-northeast-2.amazonaws.com/login', { "email": email, "password":password }),
  register: (username, email, password) =>
    requests.setpost('https://8xk6c6vlz2.execute-api.ap-northeast-2.amazonaws.com/register', { "name":username, "email": email, "password":password }),
  save: user =>
    requests.put('/user', { user })
};

const Tags = {
  getAll: () => requests.get('/tags')
};

const limit = (count, p) => `limit=${count}&offset=${p ? p * count : 0}`;
const omitSlug = article => Object.assign({}, article, { slug: undefined })
const Articles = {
  all: page =>
    requests.set(`https://8xk6c6vlz2.execute-api.ap-northeast-2.amazonaws.com/getBook?page=${page}`),
  byAuthor: (author, page) =>
    requests.get(`/articles?author=${encode(author)}&${limit(5, page)}`),
  byUser: (author, page) =>
    requests.set(`https://8xk6c6vlz2.execute-api.ap-northeast-2.amazonaws.com/getReservation?user=${author}`),
  updateReservation: (author, page) =>
    requests.setpost(`https://8xk6c6vlz2.execute-api.ap-northeast-2.amazonaws.com/updateReservation`,{"email":"testfadfsf@test.com","rsrvList":[{"booktitle":"쿠버네티스 패턴","duedate":"2020-05-26","returndate":"2020-05-18","returnYN":"Y","rsrvdate":"2020-05-12"},{"booktitle":"쿠버네티스 패턴","duedate":"2020-05-26","returndate":"2020-05-18","returnYN":"Y","rsrvdate":"2020-05-12"},{"booktitle":"쿠버네티스 패턴","duedate":"2020-05-26","returndate":"2020-05-18","returnYN":"Y","rsrvdate":"2020-05-12"},{"booktitle":"쿠버네티스 패턴","duedate":"2020-05-26","returndate":"2020-05-18","returnYN":"Y","rsrvdate":"2020-05-12"}]}),
  returnBook: (booktitle, email, returndate) =>
    requests.setpost(`https://8xk6c6vlz2.execute-api.ap-northeast-2.amazonaws.com/returnBook`,{ "booktitle":booktitle, "email": email, "returndate":returndate }),
  checkoutBook: (booktitle, email, rsrvdate, duedate) =>
    requests.setpost(`https://8xk6c6vlz2.execute-api.ap-northeast-2.amazonaws.com/checkoutBook`,{ "booktitle":booktitle, "email": email, "rsrvdate":rsrvdate, "duedate": duedate}),
  byTag: (tag, page) =>
    requests.get(`/articles?tag=${encode(tag)}&${limit(10, page)}`),
  del: slug =>
    requests.del(`/articles/${slug}`),
  favorite: slug =>
    requests.post(`/articles/${slug}/favorite`),
  favoritedBy: (author, page) =>
    requests.get(`/articles?favorited=${encode(author)}&${limit(5, page)}`),
  feed: () =>
    requests.get('/articles/feed?limit=10&offset=0'),
  get: slug =>
    requests.get(`/articles/${slug}`),
  unfavorite: slug =>
    requests.del(`/articles/${slug}/favorite`),
  update: article =>
    requests.put(`/articles/${article.slug}`, { article: omitSlug(article) }),
  create: article =>
    requests.post('/articles', { article })
};

const Comments = {
  create: (slug, comment) =>
    requests.post(`/articles/${slug}/comments`, { comment }),
  delete: (slug, commentId) =>
    requests.del(`/articles/${slug}/comments/${commentId}`),
  forArticle: slug =>
    requests.get(`/articles/${slug}/comments`)
};


export default {
  Articles,
  Auth,
  Comments,
  Tags,
  setToken: _token => { token = _token; }
};
