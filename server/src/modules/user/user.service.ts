import User from "../auth/auth.model";

interface SetUsernameType {
  userId: string;
  username: string;
}
export const setUserNameService = async ({
  userId,
  username,
}: SetUsernameType) => {
  username = username.toLowerCase().trim();

  if (username.length < 3) {
    throw new Error("USERNAME_TOO_SHORT");
  }

  if (!/^[a-z0-9_.]{3,20}$/.test(username)) {
    throw new Error("INVALID_USERNAME");
  }

  const user = await User.findById(userId).select("username");
  if (!user) {
    throw new Error("USER_NOT_FOUND");
  }

  if (user.username) {
    throw new Error("USERNAME_ALREADY_SET");
  }

  user.username = username;
  try {
    await user.save();
  } catch (error: any) {
    if (error.code === 11000) {
      throw new Error("USERNAME_TAKEN");
    }
    throw error;
  }
  return {
    username: user.username
  };
};
