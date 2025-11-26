const express = require("express");
const router = express.Router();
const user = require("../model/user");

router.get("/", async (req, res, next) => {
    
    let users = await user.find(
        {
            username: req.body.username,
            password: req.body.password
        }
    );
    res.status(200).json(users);
});
router.post("/", (req, res, next) => {
    const userData = {
        name: req.body.name,
        password: req.body.password,
    };
    user.create(userData);
});

module.exports = router;
