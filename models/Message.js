const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: [true, "Message can't be empty"],
    },
    //message sent by which user
    sentBy: {
      type: mongoose.Types.ObjectId,
      ref: "Users",
      required: [true, "Please provide user"],
    },
    //message sent in which room
    sentIn: {
      type: mongoose.Types.ObjectId,
      ref: "Room",
      required: [true, "Please provide roomId"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Messages", MessageSchema);
