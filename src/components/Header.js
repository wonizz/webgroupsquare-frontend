import React from 'react';
import { Link } from 'react-router-dom';

class Header extends React.Component {
  render() {
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
            <Link className="navbar-brand" to="#">Brand</Link>
          </div>

          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav">
              <li className="active"><Link to="#">Link <span className="sr-only">(current)</span></Link></li>
              <li><Link to="#">Link</Link></li>
              <li className="dropdown">
                <Link to="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span className="caret"></span></Link>
                <ul className="dropdown-menu">
                  <li><Link to="#">Action</Link></li>
                  <li><Link to="#">Another action</Link></li>
                  <li><Link to="#">Something else here</Link></li>
                  <li role="separator" className="divider"></li>
                  <li><Link to="#">Separated link</Link></li>
                  <li role="separator" className="divider"></li>
                  <li><Link to="#">One more separated link</Link></li>
                </ul>
              </li>
            </ul>
            <form className="navbar-form navbar-left">
              <div className="form-group">
                <input type="text" className="form-control" placeholder="Search"/>
              </div>
              <button type="submit" className="btn btn-default">Submit</button>
            </form>
            <ul className="nav navbar-nav navbar-right">
              <li><Link to="#">Link</Link></li>
              <li className="dropdown">
                <Link to="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Dropdown <span className="caret"></span></Link>
                <ul className="dropdown-menu">
                  <li><Link to="#">Action</Link></li>
                  <li><Link to="#">Another action</Link></li>
                  <li><Link to="#">Something else here</Link></li>
                  <li role="separator" className="divider"></li>
                  <li><Link to="#">Separated link</Link></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

export default Header;
