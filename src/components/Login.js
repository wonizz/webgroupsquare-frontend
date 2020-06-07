import React from 'react';
import agent from '../agent';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
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
      <div id="centerWindow" className="login-form">
      <form onSubmit={this.submitForm(email, password)}>
        <h2 className="text-center">Log-In</h2>
        <div className="form-group">
          <input
          className="form-control"
          type="email"
          placeholder="Email"
          value={email}
          onChange={this.changeEmail} />
        </div>
        <div className="form-group">
          <input
          className="form-control"
          type="password"
          placeholder="Password"
          value={password}
          onChange={this.changePassword} />
        </div>
        <div className="form-group">
          <button
            className="btn-login"
            type="submit"
            disabled={this.props.inProgress}>
            Sign in
          </button>
          <Link to="/register">
          <button
            className="btn-register"
            type="button"
            disabled={this.props.inProgress}>
            Register
          </button>
          </Link>
        </div>        
      </form>
    </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
