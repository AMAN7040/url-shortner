const { nanoid } = require("nanoid");
const URL = require("../models/url");

const generateNewShortUrl = async (req, res) => {
  const body = req.body;
  if (!body.url) return res.status(400).json({ message: "Url is required" });

  const shortId = nanoid(8);

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