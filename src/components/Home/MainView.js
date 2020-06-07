import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { CHANGE_TAB } from '../../constants/actionTypes';


const mapStateToProps = state => ({
  ...state.reservationList,
  tags: state.home.tags,
  token: state.common.token,
  email: state.common.currentUser
});

const mapDispatchToProps = dispatch => ({
  onTabClick: (tab, pager, payload) => dispatch({ type: CHANGE_TAB, tab, pager, payload })
});

const MainView = props => {
  if(!props.token) return;
  if(!props.bookList){
    return(
      <div className="cont-list"></div>
    )
  }
  const clickHandler = ev => {
    ev.preventDefault();
    window.booktitle=ev.currentTarget.attributes[0].value;
    window.email=ev.currentTarget.attributes[1].value;
    window.rsrvdate=window.getTimeStamp();
    window.duedate=window.getTimeStamp2weeksLater();
    //this.props.onLoadMore(agent.Articles.onLoadMore(20, window.number))
  };
  return (
    <table className="table table-striped table-hover">
        <thead>
          <tr>
            <th>도서명</th>
            <th>저자</th>
            <th>반납예정일</th>
            <th>대출신청</th>
          </tr>
        </thead>
        <tbody>
            {
              props.bookList.map((book, index) => {
                return (
                  <tr>
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                    <td>{book.duedate}</td>
                    <td>
                        {
                          `${book.duedate}`==="" 
                          ? (<Link to="#reservationModal" title={book.title} email={props.email.id} onClick={clickHandler} data-toggle="modal">
                                <button className="btn btn-primary">대여하기</button>
                            </Link>)
                          : (
                              <button className="btn btn-light" disabled>대여불가</button>
                            )  
                        }
                    </td>
                  </tr>
                );
              })
            }

            </tbody>
        </table>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(MainView);
