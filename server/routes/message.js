const express = require("express");
const router = express.Router();
const message = require("../model/message");

router.get("/", async (req, res, next) => {
  let messages = await message.find();

  res.status(200).json(messages);
});

router.post("/", (req, res, next) => {
  const messageData = {
    name: req.body.name,
    message: req.body.message,
  };
  message.create(messageData);
});

module.exports = router;
