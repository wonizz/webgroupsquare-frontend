import ListErrors from './ListErrors';
import React from 'react';
import agent from '../agent';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  UPDATE_FIELD_AUTH,
  REGISTER,
  REGISTER_PAGE_UNLOADED
} from '../constants/actionTypes';

const mapStateToProps = state => ({
  ...state.auth,
  success: state.auth.success
});

const mapDispatchToProps = dispatch => ({
  onChangeEmail: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'email', value }),
  onChangePassword: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'password', value }),
  onChangeConfirmPassword: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'confirmpassword', value }),
  onChangeUsername: value =>
    dispatch({ type: UPDATE_FIELD_AUTH, key: 'username', value }),
  onSubmit: (username, email, password) => {
    const payload = agent.Auth.register(username, email, password);
    dispatch({ type: REGISTER, payload })
  },
  onUnload: () =>
    dispatch({ type: REGISTER_PAGE_UNLOADED })
});

class Register extends React.Component {
  constructor() {
    super();
    this.changeEmail = ev => this.props.onChangeEmail(ev.target.value);
    this.changePassword = ev => this.props.onChangePassword(ev.target.value);
    this.changeConfirmPassword = ev => this.props.onChangeConfirmPassword(ev.target.value);
    this.changeUsername = ev => this.props.onChangeUsername(ev.target.value);

    this.submitForm = (username, email, password) => ev => {
      if (!window.isSubmitOk()) return false;
      ev.preventDefault();
      this.props.onSubmit(username, email, password);

    }
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  componentDidMount() {
    window.validateForm();
  }

  render() {
    //window.validateForm();
    const email = this.props.email;
    const password = this.props.password;
    const username = this.props.username;
    const styleObj = {
      "margin-left": "30px",
    }
    if (this.props.success) {
      window.openSuccessModal();
      window.closeSuccessModalEvent();
    }
    return (
      <div className="container fadeInDown">
        <form id="contact_form" className="well form-horizontal" onSubmit={this.submitForm(username, email, password)}>
          <fieldset>
            <legend><center><h2><b>Registration Form</b></h2></center></legend>
            <ListErrors errors={this.props.errors} />
            <div className="form-group">
              <label className="col-md-4 control-label">E-Mail</label>
              <div className="col-md-4 inputGroupContainer">
                <div className="input-group">
                  <span className="input-group-addon"><i className="glyphicon glyphicon-envelope"></i></span>
                  <input
                    className="form-control form-control-lg"
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={this.props.email}
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
                    name="user_password"
                    placeholder="Password"
                    value={this.props.password}
                    onChange={this.changePassword}
                    data-minlength="8"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label className="col-md-4 control-label" >Confirm Password</label>
              <div className="col-md-4 inputGroupContainer">
                <div className="input-group">
                  <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
                  <input
                    className="form-control"
                    type="password"
                    name="confirm_password"
                    placeholder="Confirm Password"
                    value={this.props.confirmpassword}
                    onChange={this.changeConfirmPassword}
                    data-minlength="8"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="form-group">
              <label className="col-md-4 control-label">Username</label>
              <div className="col-md-4 inputGroupContainer">
                <div className="input-group">
                  <span className="input-group-addon"><i className="glyphicon glyphicon-user"></i></span>
                  <input
                    className="form-control"
                    type="text"
                    name="user_name"
                    placeholder="Username"
                    value={this.props.username}
                    onChange={this.changeUsername} />
                </div>
              </div>
            </div>
            <div className="form-group">
              <label className="col-md-4 control-label"></label>
              <div className="text-center">
                <button
                  className="btn btn-primary btn-block custom-btn"
                  type="submit"
                  disabled={this.props.inProgress}>
                  Sign up
                  </button>
                  <p class="text-center"><Link to="/login" class="btn">Already Have an Account?</Link></p>
              </div>
            </div>
          </fieldset>
        </form>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
