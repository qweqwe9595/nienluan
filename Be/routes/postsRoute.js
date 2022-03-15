const router = require("express").Router();
const postsModel = require("../model/postsModel");
const userModel = require("../model/usersModel");
const {
  createAPost,
  getTimeLine,
  getAllPost,
  getAProfilePosts,
  getAPost,
  updateAPost,
  deleteAPost,
  likeAPost,
  commentAPost,
} = require("../controller/postsController");

//create a post
router.post("/", createAPost);
//get timeline
router.get("/timeline/:id", getTimeLine);

//get all post
router.get("/admin", getAllPost);

//get a profile posts
router.get("/profile/:id", getAProfilePosts);

//get a post
router.get("/:id", getAPost);

//update 1 post (chinh sua)
router.patch("/:id", updateAPost);

//delete a post
router.delete("/:id", deleteAPost);

//like a post
router.post("/like/:id", likeAPost);
//create comment a post
router.put("/comment/:id", commentAPost);

module.exports = router;
