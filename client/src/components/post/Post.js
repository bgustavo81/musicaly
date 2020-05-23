import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Spinner from "../Spinner";
import PostItem from "../posts/PostItem";
import { getPost, getComments } from "../../actions/index";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";
const Post = ({ getPost, getComments, post: {post, loading}, comment: {comments}, match }) => {
  useEffect(() => {
    getPost(match.params.id);
  }, [getPost]);

  useEffect(() => {
    getComments(match.params.id);
  }, [getComments])



  return loading || post === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <Link to="/posts" className="btn">
        {" "}
        Back To Posts
      </Link>
      <PostItem post={post} showActions={false} />
      <CommentForm postId={post.post_id} />
      <div className="comments">
      {comments ? (
        <>
          {comments.map(comment => (
            <CommentItem key={comment.id} comment={comment} postId={post.post_id} />
          ))}
        </>
      ) : (
        <span></span>
      )}
      </div>
    </Fragment>
  );
};

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  getComments: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post,
  comment: state.comment
});

export default connect(
  mapStateToProps,
  { getPost, getComments }
)(Post);
