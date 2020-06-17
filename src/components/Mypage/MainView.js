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
  if (!props.token) return;
  if (!props.rsrvList) {
    return (
      <div className="cont-list"></div>
    )
  }
  const clickHandler = ev => {
    ev.preventDefault();
    window.booktitle = ev.currentTarget.attributes[0].value;
    window.email = ev.currentTarget.attributes[1].value;
    window.returndate = window.getTimeStamp();
  };
  return (
    <table className="table table-striped table-bordered dataTable no-footer">
      <thead>
        <tr>
          <th>도서명</th>
          <th>대출일</th>
          <th>반납예정일</th>
          <th>반납일</th>
          <th>반납신청</th>
        </tr>
      </thead>
      <tbody>
        {
          props.rsrvList.map((reservation, index) => {
            return (
              <tr>
                <td>{reservation.booktitle}</td>
                <td>{reservation.rsrvdate}</td>
                <td>{reservation.duedate}</td>
                <td>{reservation.returndate}</td>
                <td>
                  {
                    `${reservation.returndate}` === "undefined"
                      ? (<Link to="#returnModal" title={reservation.booktitle} email={props.email.id} onClick={clickHandler} data-toggle="modal">
                        <button className="btn btn-primary">반납하기</button>
                      </Link>)
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
