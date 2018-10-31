import React, { Component } from 'react';
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import Tooltip from '@material-ui/core/Tooltip';
import { deletePost, addLike, disLike } from '../../actions/postActions';


class PostItem extends Component {


  onDeleteClick(id) {
    this.props.deletePost(id);
  }

  onLikeClick(id) {
    this.props.addLike(id);
  }

  onDisLikeClick(id) {
    this.props.disLike(id);
  }

  // onUnLikeClick(id) {
  //   this.props.removeLike(id);
  // }


  findUserLike(likes) {
    const { auth } = this.props;
    if (likes.filter(like => like.user === auth.user.id).length > 0) {
      return true;
    } else {
      return false;
    }
  }

  findUserDisLike(dislikes) {
    const { auth } = this.props;
    if (dislikes.filter(dislike => dislike.user === auth.user.id).length > 0) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    const { post, auth, showActions } = this.props;

  
    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <a href="profile.html">
              <img
                className="rounded-circle d-none d-md-block"
                src={post.avatar}
                alt=""
              />
            </a>
            <br />
            <p className="text-center">{post.name}</p>
          </div>
          <div className="col-md-10">
            <p className="lead">{post.text}</p>
            {showActions ? (
              <span>
              <Tooltip title="This action cannot be undone">
                <button 
                  onClick={this.onLikeClick.bind(this, post._id)}
                  type="button" 
                  className="btn btn-light mr-1"
                >
                  <i 
                    className={classnames('fas fa-thumbs-up', {
                          'text-info': this.findUserLike(post.likes)
                    })}
                  />
                  <span className="badge badge-light">{post.likes.length}</span>
                </button>
              </Tooltip>
              {/* <p 
                onClick={this.onUnLikeClick.bind(this, post._id)}>Unlike</p> */}
                <Tooltip title="this action cannot be undone">
                  <button 
                    onClick={this.onDisLikeClick.bind(this, post._id)}
                    type="button" 
                    className="btn btn-light mr-1"
                  >
                    <i 
                      className={classnames('fas fa-thumbs-down', {
                            'text-info': this.findUserDisLike(post.dislikes)
                      })}
                    />
                    <span className="badge badge-light">{post.dislikes.length}</span>
                  </button>
                </Tooltip>
                <Link to={`/post/${post._id}`} className="btn btn-info mr-1">
                  Comments
                </Link>
                
                {post.user === auth.user.id ? (
                    <Tooltip title="this action cannot be undone">
                      <button
                        onClick={this.onDeleteClick.bind(this, post._id)}
                        type="button"
                        className="btn btn-danger mr-1"
                      >
                        <i className="fas fa-times" />
                      </button>
                    </Tooltip>
                ) : null}
              </span>
            ) : null}
          </div>
        </div>
      </div>
    )
  }
}

PostItem.defaultProps = {
  showActions: true
};



PostItem.propTypes = {
  deletePost: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  disLike: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { deletePost, addLike, disLike })(
  PostItem
);

