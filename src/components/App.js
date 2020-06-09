import agent from '../agent';
import Header from './Header';
import Footer from './Footer';
import React from 'react';
import { connect } from 'react-redux';
import { APP_LOAD, REDIRECT, LOGOUT } from '../constants/actionTypes';
import { Route, Switch } from 'react-router-dom';
import Home from '../components/Home';
import Login from '../components/Login';
import Mypage from '../components/Mypage';
import Register from '../components/Register';
import { store } from '../store';
import { push } from 'react-router-redux';

const mapStateToProps = state => {
  return {
    appLoaded: state.common.appLoaded,
    appName: state.common.appName,
    currentUser: state.common.currentUser,
    redirectTo: state.common.redirectTo
  }};

const mapDispatchToProps = dispatch => ({
  onLoad: (payload, token) =>
    dispatch({ type: APP_LOAD, payload, token, skipTracking: true }),
  onRedirect: () =>
    dispatch({ type: REDIRECT }),
  onLogout: () =>
    dispatch({  type: LOGOUT })
});

class App extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.redirectTo) {
      //this.context.router.replace(nextProps.redirectTo);
      store.dispatch(push(nextProps.redirectTo));
      this.props.onRedirect();
    }
  }
  componentWillMount() {
    const token = window.localStorage.getItem('jwt');
    const location = window.location.href;
    if (token) {
      agent.setToken(token);
    }
    if(!token && (location.indexOf('login')===-1)){
      window.location.href = '/login';
    }

    if(token && (location.indexOf('login')!==-1 || location.indexOf('register')!==-1)){
      window.location.href = '/';
    }
    this.props.onLoad(token ? agent.Auth.current(token) : null, token);
  }


  render() {
    if (this.props.appLoaded) {
      if(this.props.currentUser === 'expired'){
        return (
          <div>
          <Header
            appName={this.props.appName}
            currentUser={this.props.currentUser} 
            onLogout={this.props.onLogout}/>
            <Login/>
            <Footer/>
        </div>
        )
      }
      return (
        <div>
          <Header
            appName={this.props.appName}
            currentUser={this.props.currentUser} 
            onLogout={this.props.onLogout}/>
            <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/mypage" component={Mypage} />
            </Switch>
            <Footer/>
        </div>
      );
    }
    return (
      <div>
        <Header
          appName={this.props.appName}
          currentUser={this.props.currentUser} />
      </div>
    );
  }
}

// App.contextTypes = {
//   router: PropTypes.object.isRequired
// };

export default connect(mapStateToProps, mapDispatchToProps)(App);
