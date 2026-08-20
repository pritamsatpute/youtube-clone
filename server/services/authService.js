// Packages
import bcrypt from "bcryptjs";

// Models
import User from "../models/User.js";

// Utils
import generateToken from "../utils/generateToken.js";
import ApiError from "../utils/ApiError.js";

// Register User
export const registerUser = async ({
  name,
  username,
  email,
  password,
}) => {
  // Normalize Input
  const normalizedName =
    name?.trim();

  const normalizedUsername =
    username?.trim().toLowerCase();

  const normalizedEmail =
    email?.trim().toLowerCase();

  // Validate Name
  if (!normalizedName) {
    throw new ApiError(
      400,
      "Name is required.",
    );
  }

  // Validate Username
  if (!normalizedUsername) {
    throw new ApiError(
      400,
      "Username is required.",
    );
  }

  if (
    normalizedUsername.length < 3 ||
    normalizedUsername.length > 30
  ) {
    throw new ApiError(
      400,
      "Username must be between 3 and 30 characters.",
    );
  }

  if (
    !/^[a-z0-9_]+$/.test(
      normalizedUsername,
    )
  ) {
    throw new ApiError(
      400,
      "Username can only contain letters, numbers, and underscores.",
    );
  }

  // Validate Email
  if (!normalizedEmail) {
    throw new ApiError(
      400,
      "Email is required.",
    );
  }

  // Validate Password
  if (!password) {
    throw new ApiError(
      400,
      "Password is required.",
    );
  }

  if (password.length < 6) {
    throw new ApiError(
      400,
      "Password must be at least 6 characters.",
    );
  }

  // Check Existing Email
  const existingEmail =
    await User.findOne({
      email: normalizedEmail,
    });

  if (existingEmail) {
    throw new ApiError(
      409,
      "Email already registered.",
    );
  }

  // Check Existing Username
  const existingUsername =
    await User.findOne({
      username:
        normalizedUsername,
    });

  if (existingUsername) {
    throw new ApiError(
      409,
      "Username already taken.",
    );
  }

  // Hash Password
  const hashedPassword =
    await bcrypt.hash(
      password,
      10,
    );

  // Create User
  const user = await User.create({
    name: normalizedName,

    username:
      normalizedUsername,

    email:
      normalizedEmail,

    password:
      hashedPassword,

    avatar:
      "/images/default-avatar.png",
  });

  // Generate Token
  const token =
    generateToken(user._id);

  // Populate Channel
  await user.populate(
    "channel",
    "channelName handle avatar",
  );

  // Response
  return {
    success: true,

    message:
      "Registration successful",

    token,

    user: {
      _id: user._id,

      name:
        user.name,

      username:
        user.username,

      email:
        user.email,

      avatar:
        user.avatar,

      channel:
        user.channel,
    },
  };
};

// Login User
export const loginUser = async ({
  email,
  password,
}) => {
  // Normalize Email
  const normalizedEmail =
    email?.trim().toLowerCase();

  // Validate Email
  if (!normalizedEmail) {
    throw new ApiError(
      400,
      "Email is required.",
    );
  }

  // Validate Password
  if (!password) {
    throw new ApiError(
      400,
      "Password is required.",
    );
  }

  // Find User
  const user =
    await User.findOne({
      email: normalizedEmail,
    })
      .populate(
        "channel",
        "channelName handle avatar",
      )
      .select("+password");

  // User Not Found
  if (!user) {
    throw new ApiError(
      401,
      "Invalid email or password.",
    );
  }

  // Compare Password
  const isMatch =
    await bcrypt.compare(
      password,
      user.password,
    );

  if (!isMatch) {
    throw new ApiError(
      401,
      "Invalid email or password.",
    );
  }

  // Generate Token
  const token =
    generateToken(user._id);

  // Response
  return {
    success: true,

    message:
      "Login successful",

    token,

    user: {
      _id: user._id,

      name:
        user.name,

      username:
        user.username,

      email:
        user.email,

      avatar:
        user.avatar,

      channel:
        user.channel,
    },
  };
};

// Current User
export const getCurrentUser = async (
  user,
) => {
  // Find User
  const currentUser =
    await User.findById(
      user._id,
    ).populate(
      "channel",
      "channelName handle avatar",
    );

  // User Not Found
  if (!currentUser) {
    throw new ApiError(
      404,
      "User not found.",
    );
  }

  // Response
  return {
    success: true,

    user: {
      _id:
        currentUser._id,

      name:
        currentUser.name,

      username:
        currentUser.username,

      email:
        currentUser.email,

      avatar:
        currentUser.avatar,

      channel:
        currentUser.channel,
    },
  };
};

// Logout User
export const logoutUser = async () => {
  return {
    success: true,

    message:
      "Logout successful",
  };
};