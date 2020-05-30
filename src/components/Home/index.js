import MainView from './MainView';
import Modal from './Modal';
import Complete from './Complete';
import React from 'react';
import agent from '../../agent';
import { connect } from 'react-redux';
import {
  HOME_PAGE_LOADED,
  HOME_PAGE_UNLOADED,
  APPLY_TAG_FILTER
} from '../../constants/actionTypes';
import ListPagination from '../ListPagination';


const mapStateToProps = state => ({
  ...state.home,
  appName: state.common.appName,
  token: state.common.token,
  user: state.common.currentUser,
  bookCount: state.reservationList.bookCount
});

const mapDispatchToProps = dispatch => ({
  onClickTag: (tag, pager, payload) =>
    dispatch({ type: APPLY_TAG_FILTER, tag, pager, payload }),
  onLoad: (payload) =>
    dispatch({ type: HOME_PAGE_LOADED,  payload }),
  onUnload: () =>
    dispatch({  type: HOME_PAGE_UNLOADED })
});

class Home extends React.Component {
  componentWillMount() {
    this.props.onLoad(agent.Articles.all(1));
    //agent.Articles.updateReservation();
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

 

  render() {
    if(this.props.user === null) return false;  
    if(this.props.bookList !== undefined){
      return(
        <div className="cont-list"></div>
      )
    }
    return (
      <div className="container">
        <div className="table-wrapper">
            <div className="table-title">
                <div className="row">
                    <div className="col-sm-6">
                      <h2>{this.props.user.name}님 <b>안녕하세요!</b></h2>
                    </div>
                </div>
            </div>
            <MainView/>
            <Modal
            onLoad={this.props.onLoad}
            />
            <Complete/>
            <ListPagination
              bookCount={this.props.bookCount}
            />
        </div>
    </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
