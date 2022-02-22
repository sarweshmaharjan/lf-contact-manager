import jwt from "jsonwebtoken";
import { GENERAL } from "../config/config";

const auth = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) return res.status(401).send("Access denied. No token provided.");

  try {
    const decoded = jwt.verify(token, GENERAL.JWT_PRIVATE_KEY);
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send("Invalid token.");
  }
};

export default auth;
