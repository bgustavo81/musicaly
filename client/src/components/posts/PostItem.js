import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { connect } from "react-redux";
import { addLike, removeLike, deletePost } from "../../actions/index";

const PostItem = ({
  auth,
  addLike,
  removeLike,
  deletePost,
  post: { created_by, title, content, post_id, author, created_at, likes },
  showActions
}) => (
  <div className="post bg-white p-1 my-1">
    <div>
      <Link to={`/profile/${created_by}`}>
        <h4>{author}</h4>
      </Link>
    </div>
    <div>
      <h2 className="my-1">{title}</h2>
      <p className="my-1">{content}</p>
      <p className="post-date">
        Posted on <Moment format="DD/MM/YYYY HH:mm">{created_at}</Moment>
      </p>
      {showActions && (
        <Fragment>
          <button
            onClick={e => addLike(post_id)}
            type="button"
            className="btn btn-light">
            <i className="fas fa-thumbs-up"></i>
            <span>{likes > 0 && <span> {likes}</span>}</span>
          </button>
          <button
            onClick={e => removeLike(post_id)}
            type="button"
            className="btn btn-light">
            <i className="fas fa-thumbs-down"></i>
          </button>
          <Link to={`/posts/${post_id}`} className="btn btn-primary">
            Discussion
          </Link>
          {!auth.loading && created_by === auth.user.id && (
            <button
              onClick={e => deletePost(post_id)}
              type="button"
              className="btn btn-danger">
              <i className="fas fa-trash"></i>
            </button>
          )}
        </Fragment>
      )}
    </div>
  </div>
);

PostItem.defaultProps = {
  showActions: true
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { addLike, removeLike, deletePost }
)(PostItem);
