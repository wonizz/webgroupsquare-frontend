import React from 'react';

import { Link } from 'react-router-dom';
import SuccessModal from './SuccessModal';
class Header extends React.Component {
  render() {
    let currentUser = this.props.currentUser || "";
    const clickHandler = ev => {
      ev.preventDefault();
      this.props.onLogout();
    };
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            {
              `${currentUser}` !== ""
                ? (<Link className="navbar-brand" to="/">WEBGROUP</Link>)
                : (<Link className="navbar-brand" to="/login">WEBGROUP  </Link>)
            }

          </div>

          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">

            <ul className="nav navbar-nav navbar-right">
              <li><Link to="/">{
                `${currentUser}` !== ""
                  ? ('BOOK LIST')
                  : ('')
              }</Link></li>
              <li><Link to="/mypage">{
                `${currentUser}` !== ""
                  ? ('MY PAGE')
                  : ('')
              }</Link></li>
              <li><Link to="#" onClick={clickHandler}>{
                `${currentUser}` !== ""
                  ? ('LOG OUT')
                  : ('')
              }</Link></li>
            </ul>
          </div>
        </div>
        <SuccessModal />
      </nav>
    );
  }
}

export default Header;
