import mongoose from "mongoose";

const chatSchema = mongoose.Schema({
  from: { type: String, required: true },
  to: { type: String, required: true },
  chat_id: { type: String, required: true },
  content: { type: String, required: true },
  read: { type: Boolean, default: false },
  create_time: { type: Number },
});

const ChatModel = mongoose.model("chat", chatSchema);
export default ChatModel;
