import React, { Component } from 'react';
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutuser } from "../../actions/authActions";
import { clearCurrentProfile } from "../../actions/profileActions";


class Navbar extends Component {

    onLogoutClick(e){
        e.preventDefault();
        this.props.clearCurrentProfile()
        this.props.logoutuser()
    }

  render() {

    const { isAuthenticated, user } = this.props.auth;

    const authLink =  (
        <ul className="navbar-nav ml-auto">
            
            <li className="nav-item">
                <Link className="nav-link" to="/feed">Post feed</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/dashboard">Dashboard</Link>
            </li>
            <li className="nav-item">
                <a href="" className="nav-link" onClick={this.onLogoutClick.bind(this)} >
                    <img 
                        className="rounded-circle"
                        src={user.avatar} 
                        style={{ width:"25px", marginRight:"5px"}} 
                    />
                    Logout
                </a>
            </li>
        </ul>
    )

    const guestLink =  (
        <ul className="navbar-nav ml-auto">
            <li className="nav-item">
                <Link className="nav-link" to="/register">Sign Up</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
            </li>
        </ul>
    )


    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
            <div className="container">
                <Link className="navbar-brand" to="/">DevConnector</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="mobile-nav">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/profiles">Developers</Link>
                        </li>
                    </ul>

                    {isAuthenticated ? authLink : guestLink }
                </div>
            </div>
        </nav> 
    )
  }
}

Navbar.propTypes = {
    logoutuser:PropTypes.func.isRequired,
    auth:PropTypes.object.isRequired,
    errors:PropTypes.object.isRequired
  
  }
  
  const mapStateToProps = (state) => ({
    auth:state.auth,
    errors:state.errors
  })

  export default connect(
    mapStateToProps,
    { logoutuser, clearCurrentProfile }
  )(Navbar);