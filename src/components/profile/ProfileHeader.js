import React, { Component } from 'react';
import isEmpty from '../../validation/is-empty';
import { Tooltip, Button } from '@material-ui/core';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from 'classnames';
import { followUser } from "../../actions/profileActions";

class ProfileHeader extends Component {

  componentDidMount() {
    
  }

  componentWillReceiveProps(nextProps) {
    
  }

  findUserFollow(followers) {
    const { auth , profile} = this.props;
    if (followers.filter(follower => follower.user === auth.user.id).length > 0) {
      return (
        <Tooltip title="Already Following">
          <button
            className="btn btn-danger disabled"
          >
            Followed
          </button>
        </Tooltip>
      )
    } else {
     
        return (
          <Tooltip title="Follow">
            <button
              onClick={this.onFollowClick.bind(this, profile.user._id)}
              className="btn btn-primary"
            >
              Follow
            </button>
          </Tooltip>
        );
      }
      
    }
     
    

  onFollowClick(id) {
    this.props.followUser(id);
    console.log(id)
  }



  render() {

    const { auth, profile } = this.props;

    
    return (
      <div className="row">
        <div className="col-md-12">
            <div className="card card-body bg-info text-white mb-3">
              <div className="row">
                <div className="col-4 col-md-3 m-auto">
                  <img className="rounded-circle" src={profile.user.avatar} alt="" />
                </div>
              </div>
              <div className="text-center">
                <h1 className="display-4 text-center">{profile.user.name}</h1>
                <p className="lead text-center">{profile.status} {isEmpty(profile.company) ? null : (
                  (
                    <span>at {profile.company}</span>
                  )
                )}</p>
                {isEmpty(profile.location) ? null : (
                  (
                    <p>{profile.loaction}</p>
                  )
                )}
                <p>
                {isEmpty(profile.website) ? null : (
                  <a className="text-white p-2" href={profile.website} >
                    <i className="fab fa-globe fa-2x"/>
                  </a>
                )}
                {isEmpty(profile.social && profile.social.twitter) ? null : (
                  <a className="text-white p-2" href={profile.social.twitter} >
                    <i className="fab fa-twitter fa-2x"/>
                  </a>
                )}
                {isEmpty(profile.social && profile.social.facebook) ? null : (
                  <a className="text-white p-2" href={profile.social.facebook} >
                    <i className="fab fa-facebook fa-2x"/>
                  </a>
                )}
                {isEmpty(profile.social && profile.social.linkedin) ? null : (
                  <a className="text-white p-2" href={profile.social.linkedin} >
                    <i className="fab fa-linkedin fa-2x"/>
                  </a>
                )}
                {isEmpty(profile.social && profile.social.youtube) ? null : (
                  <a className="text-white p-2" href={profile.social.youtube} >
                    <i className="fab fa-youtube fa-2x"/>
                  </a>
                )}
                {isEmpty(profile.social && profile.social.instagram) ? null : (
                  <a className="text-white p-2" href={profile.social.instagram} >
                    <i className="fab fa-instagram fa-2x"/>
                  </a>
                )}
                </p>
                
                {this.findUserFollow(profile.user.followers)}
              <br/>
              <br/>
              <span  style={{marginRight:"10px"}} className="badge badge-light">Followers : {profile.user.followers.length}</span> 
              <span  className="badge badge-light">Following : {profile.user.following.length}</span> 
              </div>
              
            </div>
          </div>
        </div>

    )
  }
}




ProfileHeader.propTypes = {
  getProfileHandle:PropTypes.func.isRequired,
  followUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { followUser })(
  ProfileHeader
);

