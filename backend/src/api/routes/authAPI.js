import express from "express";
import { GENERAL } from "../config/config";
import * as userController from "../controllers/user/userController";
import validate from "../middleware/requestCheck";

const router = express.Router();

/**
 * Check if JWT private key is present or not.
 * @type {string} - JWT private key
 */
if (!GENERAL.JWT_PRIVATE_KEY) {
  console.log("Please set JWT Private Key...");
  process.exit(1);
}

/**
 * Routes for Authenticated user
 */
router.post("/sign-up", validate, userController.create);
router.post("/sign-in", validate, userController.login);

export default router;
