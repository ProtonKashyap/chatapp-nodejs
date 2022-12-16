const mongoose = require("mongoose");

const RoomSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true,
  },
});

module.exports = mongoose.model("Room", RoomSchema);
