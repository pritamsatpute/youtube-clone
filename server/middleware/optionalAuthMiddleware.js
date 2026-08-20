// Packages
import jwt from "jsonwebtoken";

// Models
import User from "../models/User.js";

// Optional Authentication
const optionalAuthMiddleware = async (
  req,
  res,
  next,
) => {
  try {
    // Authorization Header
    const authHeader =
      req.headers.authorization;

    // Guest
    if (
      !authHeader ||
      !authHeader.startsWith(
        "Bearer ",
      )
    ) {
      return next();
    }

    // Token
    const token =
      authHeader.split(" ")[1];

    // Verify Token
    const decoded =
      jwt.verify(
        token,
        process.env.JWT_SECRET,
      );

    // User
    const user =
      await User.findById(
        decoded.id,
      );

    // Valid User
    if (user) {
      req.user = user;
    }

    next();
  } catch (error) {
    // Invalid token behaves
    // like a guest.
    next();
  }
};

export default optionalAuthMiddleware;