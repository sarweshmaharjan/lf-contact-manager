const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

const ContactController = require("../controllers/Contact/ContactController");

// Contact API
router.get("/",auth, ContactController.index);

router.get("/:id",auth, ContactController.show);

router.post("/",auth, ContactController.create);

router.put("/:id",auth, ContactController.update);

router.delete("/:id",auth, ContactController.destroy);

router.post("/:id/set-favorite",auth, ContactController.setFavorite);

module.exports = router;
