import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../common/Spinner";
import { Link } from 'react-router-dom';
import { getProfileHandle } from "../../actions/profileActions";
import ProfileHeader from './ProfileHeader';
import ProfileAbout from './ProfileAbout';
import ProfileCreds from './ProfileCreds';
import ProfileGithub from './ProfileGithub';

class Profile extends Component {

  componentDidMount() {
    if (this.props.match.params.handle) {
      this.props.getProfileHandle(this.props.match.params.handle)
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.profile.profile === null && this.props.profile.loading) {
      this.props.history.push('/not-found');
    }
  }

  
  render() {

    const { profile , loading} = this.props.profile;

    let profileContent;

    if(profile === null || loading){
      profileContent = <Spinner/>
    } else {
      profileContent = (
        <div>
          <div className="row">
            <div className="col-md-6">
              <Link to="/profiles" className="btn btn-light mb-3 float-left">
              Back To Profiles
              </Link>
            </div>
            <div className="col=md-6"/>
          </div> 
          <ProfileHeader profile={profile} />
          <ProfileAbout profile={profile}/>
          <ProfileCreds education={profile.education} experience={profile.experience}/>
          {profile.githubusername ? ( 
            <ProfileGithub username={profile.githubusername}/>
          ) : null }
          
        </div>
      )
    }

    return (
      <div class="profile">
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              {profileContent}
            </div>
          </div>
        </div>
      </div>
      
        
         
    )
  }
}


Profile.propTypes = {
  getProfileHandle:PropTypes.func.isRequired,
  profile:PropTypes.object.isRequired

}

const mapSateToProps = state => ({
  profile:state.profile,
})


export default connect(mapSateToProps,{getProfileHandle})(Profile);