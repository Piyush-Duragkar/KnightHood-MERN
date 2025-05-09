import Notification from "./../models/notification.model.js";

export const getNotification = async (req, res) => {
  try {
    const userId = req.user._id;
    const notification = await Notification.find({ to: userId }).populate({
      path: "from",
      select: "username profileImg",
    });
    await Notification.updateMany({ to: userId }, { read: true });
    res.status(200).json(notification);
  } catch (error) {
    console.log(error, "Error getting notifications");
    res.status(500).send(error.message);
  }
};

export const deleteNotification = async (req, res) => {
  try {
    const userId = await req.user._id;
    await Notification.deleteMany({ to: userId });
    res.status(200).send("Notifications deleted");
  } catch (error) {
    console.log(error, "Error deleting notifications");
    res.status(500).send(error.message);
  }
};
