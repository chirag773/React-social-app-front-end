import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getCurrentProfile, deleteAccount } from "../../actions/profileActions";
import Spinner from "../common/Spinner";
import { Link } from 'react-router-dom';
import ProfileActions from './ProfileActions';
import Experience from './Experience';
import Education from './Education';
import Tooltip from '@material-ui/core/Tooltip';
import { Button } from '@material-ui/core';

class Dashboard extends Component {

  componentDidMount() {
    this.props.getCurrentProfile()
  }


  onDeleteClick(e){
    this.props.deleteAccount()
  }


  render() {

    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;
    let dashBoardContent;

    if (profile === null || loading) {
      dashBoardContent = <Spinner />
    } else {
      if (Object.keys(profile).length > 0) {
        dashBoardContent = (
          <div>
            <p className="lead text-muted">WELCOME 
              <Link to={`/profile/${profile.handle}`}>
                 {user.name}
              </Link>
            </p>
            <ProfileActions/>
            <Experience experience={profile.experience}/>
            <Education education={profile.education}/>
            <div style={{marginBottom: "60px"}}>
            <Tooltip title="This action cannot be undone">
              <Button
               onClick={this.onDeleteClick.bind(this)} 
               variant="contained" 
               color="secondary"
               >
                Delete My Account
              </Button>
            </Tooltip>
          </div>
          </div>
          )
      } else {
        dashBoardContent = (
          <div>
            <p className="lead text-muted">WELCOME {user.name} </p>
            <p>You have not setup your profile cilck on the button to crate profile</p>
            <Link to="/create-profile" className="btn btn-lg btn-info">Create Profile</Link>
          </div>
        )
      }
    }

    return (
      <div className="dashBoard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              { dashBoardContent }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Dashboard.propTypes = {
  getCurrentProfile:PropTypes.func.isRequired,
  deleteAccount:PropTypes.func.isRequired,
  auth:PropTypes.object.isRequired,
  profile:PropTypes.object.isRequired

}

const mapSateToProps = state => ({
  profile:state.profile,
  auth:state.auth
})

export default connect(mapSateToProps, 
  { 
    getCurrentProfile, 
    deleteAccount 
  })(Dashboard);