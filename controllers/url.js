const shortid = require("shortid");
const URL = require("../models/url");

const generateNewShortUrl = async (req, res) => {
  const body = req.body;
  if (!body.url) return res.status(400).json({ message: "Url is required" });

  const shortId = shortid();

  await URL.create({
    shortId: shortId,
    redirectURL: body.url,
    visitHistory: [],
  });

  return res.render("home", { id: shortId });
};

const getUrl = async (req, res) => {
  const shortId = req.params.id;
  const entry = await URL.findOneAndUpdate(
    { shortId },
    { $push: { visitHistory: { timestamp: Date.now() } } }
  );
  if (!entry) return res.status(404).json({ message: "URL not found" });

  res.redirect(entry.redirectURL);
};

const getAnalytics = async (req, res) => {
  const shortId = req.params.id;
  const result = await URL.findOne({ shortId });
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
};

module.exports = {
  generateNewShortUrl,
  getUrl,
  getAnalytics,
};
