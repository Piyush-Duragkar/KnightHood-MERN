import mongoose from "mongoose";
import User from "./user.model.js";

const notificationSchema = new mongoose.Schema(
  {
    from: {
      type: String,
      ref: User,
      required: true,
    },
    to: {
      type: String,
      ref: User,
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["follow", "like", "comment"],
    },
    read: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;
