import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getPosts } from "../../actions/index";
import Spinner from "../Spinner";
import PostItem from "./PostItem";
import PostForm from "./PostForm";

const Posts = ({ getPosts, post: { posts, loading } }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);


  return loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-primary">Classified board</h1>
      <p className="lead">
        <i className="fas fa-user">&ensp;connect, communicate, and share</i>
      </p>
      <PostForm />
      <div className="posts">
        {posts.map(post => (
          <PostItem key={post.id} post={post} />
        ))}
      </div>
    </Fragment>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post
});

export default connect(
  mapStateToProps,
  { getPosts }
)(Posts);
