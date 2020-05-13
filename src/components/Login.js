import { Link } from 'react-router-dom';
import ListErrors from './ListErrors';
import React from 'react';
import agent from '../agent';
import { connect } from 'react-redux';
import {
  UPDATE_FIELD_AUTH,
  LOGIN,
  LOGIN_PAGE_UNLOADED
} from '../constants/actionTypes';

const mapStateToProps = state => ({ ...state.auth });

const mapDispatchToProps = dispatch => ({
  onChangeEmail: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'email', value }),
  onChangePassword: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'password', value }),
  onSubmit: (email, password) =>
    dispatch({ type: LOGIN, payload: agent.Auth.login(email, password) }),
  onUnload: () =>
    dispatch({ type: LOGIN_PAGE_UNLOADED })
});

class Login extends React.Component {
  constructor() {
    super();
    this.changeEmail = ev => this.props.onChangeEmail(ev.target.value);
    this.changePassword = ev => this.props.onChangePassword(ev.target.value);
    this.submitForm = (email, password) => ev => {
      ev.preventDefault();
      this.props.onSubmit(email, password);
    };
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    const email = this.props.email;
    const password = this.props.password;
    return (
      <div className="login-form">
      <form>
          <h2 className="text-center">Log in</h2>       
          <div className="form-group">
              <input type="text" className="form-control" placeholder="Username" required="required"/>
          </div>
          <div className="form-group">
              <input type="password" className="form-control" placeholder="Password" required="required"/>
          </div>
          <div className="form-group">
              <button type="submit" className="btn btn-primary btn-block">Log in</button>
          </div>
          <div className="clearfix">
              <label className="pull-left checkbox-inline"><input type="checkbox"/> Remember me</label>
              <a href="#" className="pull-right">Forgot Password?</a>
          </div>        
      </form>
        <p className="text-center"><a href="#">Create an Account</a></p>
    </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
