const express = require("express");
const router = express.Router();

const createContactRoute = require("./create");
const readContactRoute = require("./read");
const verifyContactRoute = require("./verify");
const deleteContactRoute = require("./delete");

router.post("/contact", createContactRoute);
router.get("/contact", readContactRoute);
router.put("/contact/:id/verify", verifyContactRoute);
router.delete("/contact/:id", deleteContactRoute);

module.exports = router;
