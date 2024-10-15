const express = require("express");
const {
  generateNewShortUrl,
  getUrl,
  getAnalytics,
} = require("../controllers/url");
const router = express.Router();

router.post("/", generateNewShortUrl);

router.get("/:id", getUrl);

router.get("/analytics /:id", getAnalytics);

module.exports = router;
