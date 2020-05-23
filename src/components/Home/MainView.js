import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { CHANGE_TAB } from '../../constants/actionTypes';


const mapStateToProps = state => ({
  ...state.reservationList,
  tags: state.home.tags,
  token: state.common.token,
});

const mapDispatchToProps = dispatch => ({
  onTabClick: (tab, pager, payload) => dispatch({ type: CHANGE_TAB, tab, pager, payload })
});

const MainView = props => {
  if(!props.token) return;
  if(!props.rsrvList){
    return(
      <div className="cont-list"></div>
    )
  }else{
    window.rsrvList = props.rsrvList;
  }
  
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
            <th>대출일</th>
            <th>반납예정일</th>
            <th>반납일</th>
            <th>액션</th>
          </tr>
        </thead>
        <tbody>
            {
              props.rsrvList.map((reservation, index) => {
                return (
                  <tr>
                    <td>
                      <span className="custom-checkbox">
                        <input type="checkbox" id="checkbox1" name="options[]" value="1"/>
                        <label for="checkbox1"></label>
                      </span>
                    </td>
                    <td>{reservation.booktitle}</td>
                    <td>{reservation.rsrvdate}</td>
                    <td>{reservation.duedate}</td>
                    <td>{reservation.returndate}</td>
                    <td>
                        <Link to="#deleteEmployeeModal" className="delete" data-toggle="modal"><i className="material-icons" data-toggle="tooltip" title="Delete">library_books</i></Link>
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
