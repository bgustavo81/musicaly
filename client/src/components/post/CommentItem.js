import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";
import { deleteComment } from "../../actions/index";

const CommentItem = ({
  comment: { comm_id, content, author, created_by, created_at, post_id },
  auth,
  deleteComment
}) => (
  <div className="post bg-white p-1 my-1">
    <div>
      <Link to={`/profile/${created_by}`}>
        <img className="round-img" src={'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'} alt="" />
        <h4>{author}</h4>
      </Link>
    </div>
    <div>
      <p className="my-1">{content}</p>
      <p className="post-date">
        Posted on <Moment format="YYYY/MM/DD">{created_at}</Moment>
      </p>
      {!auth.loading && created_by === auth.user.id && (
        <button
          onClick={() => deleteComment(post_id, comm_id)}
          type="button"
          className="btn btn-danger">
          <i className="fas fa-trash" />
        </button>
      )}
    </div>
  </div>
);

CommentItem.propTypes = {
  postId: PropTypes.number.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deleteComment }
)(CommentItem);
