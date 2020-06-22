import React from 'react';
import agent from '../agent';
import ListErrors from './ListErrors';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  UPDATE_FIELD_AUTH,
  LOGIN,
  LOGIN_PAGE_UNLOADED,
  LOGIN_PAGE_ERROR
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
    dispatch({ type: LOGIN_PAGE_UNLOADED }),
  onError: () =>
    dispatch({ type: LOGIN_PAGE_ERROR })
});

class Login extends React.Component {
  constructor() {
    super();
    this.changeEmail = ev => this.props.onChangeEmail(ev.target.value);
    this.changePassword = ev => this.props.onChangePassword(ev.target.value);
    this.submitForm = (email, password) => ev => {
      ev.preventDefault();
      email = email || "";
      password = password || "";
      if (email === "" || password === "") {
        this.props.onError();
      } else {
        this.props.onSubmit(email, password);
      }
    };
  }
  componentWillUnmount() {
    this.props.onUnload();
  }
  render() {
    const email = this.props.email;
    const password = this.props.password;
    const styleObj = {
      "margin-left": "30px",
    }
    return (
      <div className="container fadeInDown">
        <form onSubmit={this.submitForm(email, password)} className="well form-horizontal bv-form">
          <fieldset>
            <legend><center><h2><b>Marketing Service Group Login</b></h2></center></legend>
            <ListErrors errors={this.props.errors} />
            <div className="form-group">
              <label className="col-md-4 control-label">E-Mail</label>
              <div className="col-md-4 inputGroupContainer">
                <div className="input-group">
                  <span className="input-group-addon"><i className="glyphicon glyphicon-envelope"></i></span>
                  <input
                    className="form-control"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={this.changeEmail} />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label className="col-md-4 control-label" >Password</label>
              <div className="col-md-4 inputGroupContainer">
                <div className="input-group">
                  <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
                  <input
                    className="form-control"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={this.changePassword} />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label className="col-md-4 control-label"></label>
              <div className="text-center">
                <button
                  className="btn btn-primary btn-block custom-btn"
                  type="submit"
                  disabled={this.props.inProgress}
                  >
                  Login
                  </button>
                <p class="text-center"><Link to="/register" class="btn">Create Account?</Link></p>
              </div>
            </div>
          </fieldset>
        </form>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
