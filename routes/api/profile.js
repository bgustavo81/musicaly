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
const Chats = require("../../models/chats");
//@route GET api/profile/me
//@desc Get current user
//@access Private
router.get("/me", auth, async (req, res) => {
  try {
    //Profile model, pertains to the database id!

    const user_id = req.user.id;
    const user = await User.getProfileById(user_id);

    if (!user) {
      return res.status(400).json({ message: "No user for this user" });
    }
    res.json(user.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error! In user");
  }
});

//@route Post api/profile
//@desc Create or update user profile
//@access Private
router.post(
  "/",
  [
    auth,
    [
      check("level", "Status is required")
        .not()
        .isEmpty(),
      check("location", "Skills is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    //check for errors
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // destructuring 
    const {
      website,
      location,
      level,
      bio,
      interests,
      image,

      twitter,
      youtube,
      facebook,
      instagram,
      bandcamp,

      bands,
      education,
      years_playing,
      years_active,

      user_id
    } = req.body;

    // try
    // check for general info
    // create or update
    // check for social
    // create or update
    // return profile from generalinfo

    try {
      //Find the generalInfo
      let generalInfo = await GeneralInfo.getGeneralInfoById(user_id);
      if (generalInfo.rows.length < 1) {
        // if no generalInfo we add to the general_info
        generalInfo = new GeneralInfo(user_id, website, location, level, bio, interests);
        await generalInfo.createGeneralInfo();
      } else {
        await GeneralInfo.updateGeneralInfo(website, location, level, bio, interests, user_id);
      }

      let social = await Social.getSocialById(user_id);
      if (social.rows.length < 1) {
        // if no social create 
        social = new Social(user_id, twitter, youtube, facebook, instagram, bandcamp);
        await social.createSocial();
      } else {
        // if social update
        await Social.updateSocial(twitter, youtube, facebook, instagram, bandcamp, user_id);
      }

      let experience = await Experience.getExperienceById(user_id);
      if (experience.rows.length < 1) {
        // if no experience create 
        experience = new Experience(user_id, bands, education, years_playing, years_active);
        await experience.createExperience();
      } else {
        // if social update
        await Experience.updateExperience(bands, education, years_playing, years_active, user_id);
      }
    // query for image
    // image not false or empty we set new image
    if (image) {
        await GeneralInfo.addProfileImage(image, user_id);
    }
    // returning the profile
    const profile = await GeneralInfo.getProfileById(user_id);

      res.status(200).json(profile.rows[0]);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error in Profile.js");
    }
  }
);

//@route Get api/profile
//@desc Get all profiles
//@access Public
router.get("/", async (req, res) => {
  try {
    const profiles = await User.getProfiles();
    res.status(200).json(profiles.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error in profile.js");
  }
});

//@route Get api/profile/user/user_id
//@desc Get user profile by id
//@access Public
router.get("/user/:user_id", async (req, res) => {
  try {
    const profile = await User.getProfileById(req.params.user_id)
    if (!profile)
      return res.status(400).json({ msg: "Profile not found!" });
    res.json(profile.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error in profile.js");
  }
});

//@route DELETE api/profile
//@desc Remove a profile, user, and posts
//@access Private
router.delete("/", auth, async (req, res) => {
  let author = req.user.id;
  console.log(author);
  try {
    //Remove user's posts
    await Post.deletePostsByAuthor(author);
    // Remove user's comments
    await Comment.deleteCommentsByAuthor(author);
    //Removes the user, general_info, social, experience
    await User.deleteProfileByAuthor(author);
    // Remove's user's social information
    await Social.deleteSocialByAuthor(author);
    // Remove's user's social information
    await GeneralInfo.deleteGeneralInfoByAuthor(author);
    // Remove's users's experience by author
    await Experience.deleteExperienceByAuthor(author);
    // Remove's user's chatrooms
    await Chats.deleteRoomByAuthor(author);
    // Remove's user's messages
    await Chats.deleteMessagesByAuthor(author);
    res.status(200).json({msg: "Profile was deleted."})
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error in profile.js");
  }
});


module.exports = router;
