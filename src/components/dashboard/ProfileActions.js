import React from 'react';
import { Link } from 'react-router-dom';
import { Tooltip } from '@material-ui/core';

const ProfileActions = () => {
  return (
    <div className="btn-group mb-4" role="group">
      <Tooltip title="Edit Profile">
        <Link to="/edit-profile" className="btn btn-light">
            <i className="fas fa-user-circle text-info mr-1"></i> 
          Edit Profile
        </Link>
      </Tooltip>
      <Tooltip title="Add Experience">
        <Link to="/add-experience" className="btn btn-light">
          <i className="fab fa-black-tie text-info mr-1"></i>
            Add Experience
        </Link>
      </Tooltip>
      <Tooltip title="Add Education">
        <Link to="/add-education" className="btn btn-light">
          <i className="fas fa-graduation-cap text-info mr-1"></i>
            Add Education
        </Link>
      </Tooltip>
    </div>
  )
}

export default ProfileActions;