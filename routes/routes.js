const express = require("express");
const _user = require("../models/user");
const router = express.Router();

// Route to get the user id from login

router.post("/user/login", async (req, res) => {
    try{
        const user = await _user.findOne({
            username: req.body.username,
        });

        if (!user) {
            return res.status(404).send({ message: "User not found. "});
        };

        const checkPassword = (req.body.password === user.password);

        if (!checkPassword) {
            return res.status(401).send({
                message: "Incorrect Password!"
            });
        };

        // JWT Token stuff

        const role = user.role;

        return res.status(200).send({
            id : user._id,
        })
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
});

module.exports = router;



