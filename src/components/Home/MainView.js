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
						<th>
							<span className="custom-checkbox">
								<input type="checkbox" id="selectAll"/>
								<label for="selectAll"></label>
							</span>
						</th>
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
                    <td>
                      <span className="custom-checkbox">
                        <input type="checkbox" id="checkbox1" name="options[]" value="1"/>
                        <label for="checkbox1"></label>
                      </span>
                    </td>
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                    <td>{book.duedate}</td>
                    <td>
                        {
                          `${book.duedate}`==="" 
                          ? (<Link to="#deleteEmployeeModal" title={book.title} email={props.email.id} onClick={clickHandler} className="delete" data-toggle="modal"><i className="material-icons" data-toggle="tooltip" title="Delete">library_books</i></Link>)
                          : ('')  
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
