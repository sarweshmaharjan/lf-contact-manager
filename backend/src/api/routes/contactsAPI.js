import express from "express";
import auth from "../middleware/auth";
import * as contactController from "../controllers/contact/contactController";
import validate from "../middleware/requestCheck";

const router = express.Router();

/**
 * Routes for Contact
 */
router.get("/", [auth,validate], contactController.index);

router.get("/:id", [auth,validate], contactController.show);

router.post("/", [auth,validate], contactController.create);

router.put("/:id", [auth,validate], contactController.update);

router.delete("/:id", [auth,validate], contactController.destroy);

router.post("/:id/set-favorite", [auth,validate], contactController.setFavorite);

export default router;
