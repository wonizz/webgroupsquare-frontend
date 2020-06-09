import React from 'react';
import agent from '../agent';
import ListErrors from './ListErrors';
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
      <div class="wrapper fadeInDown">
        <div id="formContent">
          <ListErrors errors={this.props.errors} />
          <div class="fadeIn first">
            <img src="https://image.flaticon.com/icons/svg/2286/2286310.svg"  width="100" height="100" id="icon" alt="User Icon"/>
          </div>
          <form onSubmit={this.submitForm(email, password)}>
            
              <input
              className="fadeIn second"
              type="email"
              placeholder="Email"
              value={email}
              onChange={this.changeEmail} />
            
           
              <input
              className="fadeIn third"
              type="password"
              placeholder="Password"
              value={password}
              onChange={this.changePassword} />
              <input
                className="fadeIn fourth"
                type="submit"
                disabled={this.props.inProgress}
                value="Log in"
              />
              <div id="formFooter">
                <Link class="underlineHover" to="/register">Create Account?</Link>
              </div>
          </form>


        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
