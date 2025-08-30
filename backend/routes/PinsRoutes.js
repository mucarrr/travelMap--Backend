const router = require("express").Router();
const { createPin, getPins, getPin } = require("../controllers/PinsControllers");

router.post("/", createPin);
router.get("/", getPins);
router.get("/:id", getPin);

module.exports = router;