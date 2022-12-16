const express = require("express");
const router = express.Router();
const { getAllMessages, sendMessage } = require("../controllers/chat");

router.route("/:roomId").get(getAllMessages).post(sendMessage);

module.exports = router;
