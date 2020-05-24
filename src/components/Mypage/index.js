import Complete from './Complete';
import MainView from './MainView';
import Modal from './Modal';
import React from 'react';
import agent from '../../agent';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  MY_PAGE_LOADED,
  MY_PAGE_UNLOADED,
  APPLY_TAG_FILTER
} from '../../constants/actionTypes';


const mapStateToProps = state => ({
  ...state.home,
  appName: state.common.appName,
  token: state.common.token,
  user: state.common.currentUser
});

const mapDispatchToProps = dispatch => ({
  onClickTag: (tag, pager, payload) =>
    dispatch({ type: APPLY_TAG_FILTER, tag, pager, payload }),
  onLoad: (payload) =>
    dispatch({ type: MY_PAGE_LOADED,  payload }),
  onUnload: () =>
    dispatch({  type: MY_PAGE_UNLOADED })
});

class Home extends React.Component {
  componentWillMount() {
   
    this.props.onLoad(agent.Articles.byUser(this.props.user.id));
    //agent.Articles.updateReservation();
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    if(this.props.user === null) return false;
    return (
      <div className="container">
        <div className="table-wrapper">
            <div className="table-title">
                <div className="row">
                    <div className="col-sm-6">
						<h2>{this.props.user.name}님의 도서<b>대여 목록</b></h2>
					</div>
					<div className="col-sm-6">
						<Link to="#addEmployeeModal" className="btn btn-success" data-toggle="modal"><i className="material-icons">&#xE147;</i> <span>도서 예약</span></Link>					
					</div>
                </div>
            </div>
            <MainView/>
            <Complete/>
            <Modal
            onLoad={this.props.onLoad}
            />
            <div className="clearfix">
                <div className="hint-text">Showing <b>5</b> out of <b>25</b> entries</div>
                <ul className="pagination">
                    <li className="page-item disabled"><a to="#">Previous</a></li>
                    <li className="page-item"><Link to="#" className="page-link">1</Link></li>
                    <li className="page-item"><Link to="#" className="page-link">2</Link></li>
                    <li className="page-item active"><Link to="#" className="page-link">3</Link></li>
                    <li className="page-item"><Link to="#" className="page-link">4</Link></li>
                    <li className="page-item"><Link to="#" className="page-link">5</Link></li>
                    <li className="page-item"><Link to="#" className="page-link">Next</Link></li>
                </ul>
            </div>
        </div>
    </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
