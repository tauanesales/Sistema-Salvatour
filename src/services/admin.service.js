import User from "../models/User.js";

const findAll = () => User.find();

const deleteUserById = async (requestingUserId, userIdToDelete) => {
  try {
    const requestingUser = await User.findById(requestingUserId);

    if (!requestingUser.isAdmin) {
      throw new Error("The user does not have permission to delete other users.");
    }

    const userToDelete = await User.findByIdAndDelete(userIdToDelete);

    if (!userToDelete) {
      throw new Error("User not found");
    }

    return { message: "User deleted successfully" };
  } catch (error) {
    console.log(error)
    throw new Error(`Error deleting the user.`);
  }
};

export default {
  findAll,
  deleteUserById,
};
