import { User } from "../models/user.js";

export async function updateUserModel(id, friendId, password) {
  try {
    const user = await User.findOne({ id });

    if (!user) {
      const newUser = new User({
        id: id,
        friends: [friendId],
        password: password,
      });
      await newUser.save();
    } else {
      user.friends.push(friendId);
      await user.save();
    }
    console.log("User updated successfully!");
  } catch (error) {
    console.log("Error updating the user model.");
  }
}