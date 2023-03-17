const Room = require("../models/Room");
const Message = require("../models/Message");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError } = require("../errors");

const getAllMessages = async (req, res) => {
  let roomId = parseInt(req.params.roomId);
  const room = await Room.findOne({ id: roomId });
  if (!room) {
    await Room.create({ id: roomId });
  }
  const messages = await Message.find({ sentIn: room._id }).sort("createdAt");
  return res.status(StatusCodes.OK).json({ messages, count: messages.length });
};
const sendMessage = async (req, res) => {
  const room = await Room.findOne({ id: parseInt(req.params.roomId) });
  if (!room) throw new BadRequestError("Room doesn't exist");
  const sentIn = room._id;
  const sentBy = req.user.userId;
  const { msg } = req.body;
  if (!msg) throw new BadRequestError("Can't send empty message");
  const message = await Message.create({
    sentBy,
    sentIn,
    message: msg,
  });
  return res.status(StatusCodes.OK).json({ message });
};
module.exports = { getAllMessages, sendMessage };
