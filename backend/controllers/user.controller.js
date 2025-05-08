import User from "../models/user.model.js";
import Notification from "../models/notification.model.js";
import mongoose from "mongoose";

export const getUserProfile = async (req, res) => {
  const { username } = req.params;

  try {
    const user = await User.findOne({ username }).select("-password");
    if (!user) return res.status(400).json({ error: "User does not exist." });

    res.status(200).json(user);
  } catch (error) {
    console.log("Error in getUserProfile: ", error.message);
    res.status(500).json({ error: error.message });
  }
};

export const followUnfollowUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userToModify = await User.findById(id);
    const currentUser = await User.findById(req.user._id);

    if (id === req.user._id.toString()) {
      return res.status(400).json({ error: "You cannot follow yourself." });
    }
    if (!userToModify) {
      return res.status(400).json({ error: "User does not exist." });
    }
    const isFollowing = currentUser.following.includes(id);

    if (isFollowing) {
      await User.findByIdAndUpdate(id, { $pull: { followers: req.user._id } });
      await User.findByIdAndUpdate(req.user._id, { $pull: { following: id } });
      res.status(200).json({ message: "User unfollowed successfully." });
    } else {
      await User.findByIdAndUpdate(id, { $push: { followers: req.user._id } });
      await User.findByIdAndUpdate(req.user._id, { $push: { following: id } });
      const notification = new Notification({
        type: "follow",
        from: req.user._id,
        to: userToModify._id,
      });

      await notification.save();
      res.status(200).json({ message: "User followed successfully." });
    }
  } catch (error) {
    console.log("Error in follow and unfollow controller: ", error.message);
    res.status(500).json({ error: error.message });
  }
};

export const getSuggestedUser = async (req, res) => {
  try {
    const currentUserID = req.user._id;
    const usersFollowedByMe = await User.findById(currentUserID).select(
      "following"
    );

    const users = await User.aggregate([
      {
        $match: { _id: { $ne: currentUserID } },
      },
      { $sample: { size: 10 } },
    ]);

    const filteredUsers = users.filter(
      (user) => !usersFollowedByMe.following.includes(user._id.toString())
    );
    const suggestedUsers = filteredUsers.slice(0, 4);

    suggestedUsers.forEach((user) => (user.password = null));

    res.status(200).json(suggestedUsers);
  } catch (error) {
    console.log("Error in getSuggestedUser controller: ", error.message);
    res.status(500).json({ error: error.message });
  }
};
