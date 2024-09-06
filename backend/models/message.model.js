import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    message: {
      type: String,
      default: "", // Set default to empty string
    },
    image: {
      type: String, // Image URL
      default: null,
    },
    file: {
      type: String, // File URL
      default: null,
    },
    fileType: {
      type: String, // File type like pdf, docx, etc.
      default: null,
    },
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);

export default Message;
