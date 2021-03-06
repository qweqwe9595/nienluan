const router = require("express").Router();
const {
  createOne,
  getAll,
  getOne,
  deleteOne,
  updateOne,
  getMessageConversation,
} = require("../controller/messagesController");

const multer = require("multer");

//multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });

const authenticateToken = require("../middleWare/authJWT");
const authenticateTokenQuery = require("../middleWare/authJWTQuery");
//create 1
router.post(
  "/createOne",
  [authenticateToken, upload.single("messageFile")],
  createOne
);
//get all
router.get("/getall", authenticateTokenQuery, getAll);
//get one
router.get("/getone/:id", authenticateTokenQuery, getOne);
//get all of conversation
router.get(
  "/getfromcoversation/:id",
  authenticateTokenQuery,
  getMessageConversation
);
//update one
router.patch("/updateone/:id", authenticateToken, updateOne);
//delete a conversation
router.delete("/delete/:id", authenticateToken, deleteOne);
module.exports = router;
