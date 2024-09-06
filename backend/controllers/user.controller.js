import User from "../models/user.model.js";

export const getUsersForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;
    const loggedInUser = await User.findById(loggedInUserId);

    if (!loggedInUser) {
      return res.status(404).json({ error: "User not found" });
    }

    let filteredUsers;

    if (loggedInUser.role === "admin") {
      // Admin: Get all users except themselves
      filteredUsers = await User.find({
        _id: { $ne: loggedInUserId },
      }).select("-password");
    } else {
      // Regular User: Get only the admin
      filteredUsers = await User.find({
        role: "admin",
      }).select("-password");
    }

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.error("Error in getUsersForSidebar: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
