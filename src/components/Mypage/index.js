import Complete from './Complete';
import MainView from './MainView';
import Modal from './Modal';
import React from 'react';
import agent from '../../agent';
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
                </div>
            </div>
            <MainView/>
            <Complete/>
            <Modal
            onLoad={this.props.onLoad}
            />
        </div>
    </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
