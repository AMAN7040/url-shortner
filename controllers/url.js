const { shortid } = require("shortid");
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

  return res.status(201).json({ message: "Short url created" });
};

module.exports = {
    generateNewShortUrl,
}