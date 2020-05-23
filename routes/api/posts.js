const express = require("express");

const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../../middleware/auth");
const GeneralInfo = require("../../models/generalInfo");
const Social = require("../../models/social");
const Experience = require("../../models/experience");
const User = require("../../models/users");
const Post = require("../../models/posts");
const Comment = require("../../models/comments");

//@route POST api/posts
//@desc Create a post
//@access Private
router.post(
  "/",
  [
    auth,
    [
      check("content", "Text is required!")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {

    const author = req.body.name;
    const title = req.body.title;
    const content = req.body.content;
    const created_by = req.body.id;

    try {
    //Destructuring



    let post = new Post(null, author, title, content, created_by);
    await post.createPost();
    post = await Post.getLatestPostByUser(req.user.id);
    
    res.status(201).json(post.rows[0]);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error in posts.js");
    }
  }
);

//@route GET api/posts
//@desc Get all posts
//@access Private
router.get("/", auth, async (req, res) => {
  try {
    const posts = await Post.getPosts();
    res.json(posts.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error in posts.js");
  }
});

//@route GET api/posts/:id
//@desc Get a single post
//@access Private
router.get("/:id", auth, async (req, res) => {
  try {
    const post = await Post.getPostById(req.params.id);
    // const comments = await Comment.getCommentsByPostId(req.params.id);
    // if (!post) {
    //   return res.status(404).json({ msg: "Post not found" });
    // }
    // if (!comments) {
    //   return res.status(404).json({ msg: "Comments not found" });
    // }
    res.status(200).json(post.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error in posts.js");
  }
});

//@route DELETE api/posts/:id
//@desc Delete a single post
//@access Private
router.delete("/:id", auth, async (req, res) => {
  try {

    const post = await Post.getPostById(req.params.id);

    if (post.rows.length === 0) {
      return res.status(404).json({ msg: "Post not found" });
    }
    //Make sure user is deleting his own posts
    if (post.rows[0].created_by !== req.user.id) {
      return res
        .status(401)
        .json({ msg: "User not authorized to delete this post" });
    }

    await Post.deletePostById(req.params.id)

    res.status(200).json({ msg: "Post was removed" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post not found" });
    }
    res.status(500).send("Server error in posts.js");
  }
});

//@route PUT api/posts/like/:id
//@desc PUT a like on a single post
//@access Private
router.patch("/like/:id", auth, async (req, res) => {
  try {

    let like = await Post.getLikeByUser(req.params.id, req.user.id);

    //Check if post has already been liked by user
    if (like.rows.length === 0) {
      like = new Post(req.params.id, null, null, null, null, req.user.id, 1);
      await like.createLike();
    } else if (like.rows[0].likes === 0) {
      like = await Post.postLike(req.params.id, req.user.id);
    } else {
      return res.status(400).json({ msg: "Already liked by this user" });
    }
    // summing total likes
    let totalLikes = await Post.getSumLikes(req.params.id);
    totalLikes = totalLikes.rows[0].sum;

    // update our post
    await Post.updateLikes(req.params.id, totalLikes);

    res.status(200).json(totalLikes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error in likes posts.js");
  }
});

//@route PUT api/posts/like/:id
//@desc Remove a like on a post
//@access Private
router.patch("/unlike/:id", auth, async (req, res) => {
  try {
    let like = await Post.getLikeByUser(req.params.id, req.user.id);

    //Check if post has already been liked by user
    if (like.rows.length === 0) {
      return res.status(400).json({ msg: "Has not been liked yet" });
    } else if (like.rows[0].likes === 0) {
      return res.status(400).json({ msg: "Has not been liked yet" });
    } else {
      await Post.deleteLike(req.params.id, req.user.id);
    }
    // summing total likes
    let totalLikes = await Post.getSumLikes(req.params.id);
    totalLikes = totalLikes.rows[0].sum;
    
    // update our post
    await Post.updateLikes(req.params.id, totalLikes);

    res.status(200).json(totalLikes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error in likes posts.js");
  }
});

//@route GET api/posts/comments/:post_id
//@desc Get all comments for a post
//@access Private
router.get("/comments/:post_id", auth, async (req, res) => {
  try {
    const comments = await Comment.getCommentsByPostId(req.params.post_id);
    res.json(comments.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error in posts.js");
  }
});

//@route POST api/posts/comment/:id
//@desc Comment on a post
//@access Private
router.post(
  "/comment/:id",
  [
    auth,
    [
      check("content", "Text is required!")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {

      const content = req.body.content;
      const author = req.body.name;
      const created_by = req.body.id;
      const post_id = req.body.postId;

      let comment = new Comment(null, content, author, created_by, post_id)

      await comment.createComment();

      comment = await Comment.getLatestCommentByUser(created_by);

      res.status(200).json(comment.rows[0]);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error in posts.js");
    }
  }
);

//@route DELETE api/posts/comment/:id/:comment_id
//@desc DELETE comment
//@access Private
router.delete("/comment/:id/:comment_id", auth, async (req, res) => {
  try {
    //Get comment from post

    let comment = await Comment.getCommentById(req.params.comment_id);

    //Does comment exist?
    if (comment.rows === 0) {
      return res
        .status(404)
        .json({ msg: "Comment does not exist in posts.js" });
    }


    //Verifying ownership
    if (comment.rows[0].created_by !== req.user.id) {
      return res
        .status(401)
        .json({ msg: "Comment does not belong to you in posts.js" });
    }

    //Delete comment

    comment = await Comment.deleteComment(req.params.comment_id);

    res.status(200).json({ msg: "Comment deleted"});
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error in posts.js");
  }
});

module.exports = router;
