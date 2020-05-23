import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addPost } from "../../actions/index";

const PostForm = ({ addPost }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  return (
    <div class="post-form">
      <div class="bg-primary p">
        <h3>Say Something...</h3>
      </div>
      <form
        class="form my-1"
        onSubmit={e => {
          e.preventDefault();
          addPost({ title, content });
          setContent("");
        }}>
        <div className="form-group">
          <input
              type="text"
              placeholder="Title"
              name="title"
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
        </div>

        <div className="form-group">
          <textarea
            name="content"
            cols="30"
            rows="5"
            placeholder="Write a post"
            value={content}
            onChange={e => setContent(e.target.value)}
            required>
          </textarea>

        </div>
        <input type="submit" class="btn btn-dark my-1" value="Submit" />
      </form>
    </div>
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired
};

export default connect(
  null,
  { addPost }
)(PostForm);
