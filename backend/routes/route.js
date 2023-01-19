const express = require("express");
const router = new express.Router();
const User = require('../models/User')
const auth = require("../middleware/auth");

router.post("/login", async (req, res) => {
    try {
        const user_exists = await User.findOne({ email: req.body.email })
        if (user_exists)
            return res.status(200).send({ user: user_exists, token: user_exists.tokens[0].token })

        var user = new User(req.body)
        const token = await user.generateAuthToken();
        const saved_user = await user.save();
        console.log(saved_user)
        res.status(200).send({ user: saved_user, token })
    }
    catch (e) {
        console.log(e);
        res.status(400).send(e);
    }
});

router.get("/user-detail", auth, async (req, res) => {
    try {
        res.status(200).send(req.user)
    }
    catch (e) {
        console.log(e);
        res.status(400).send(e);
    }
});


router.post("/update-score", auth, async (req, res) => {
    try {
        const user = await User.findOne({ email: req.email })

        if (req.body.game === 'CC') {
            user.candyCrush.points += req.body.score
            user.candyCrush.highScore = Math.max(user.candyCrush.highScore, req.body.total)
            user.total += req.body.score
        }
        else if (req.body.game === 'WDLE') {
            var score = 6 - parseInt(req.body.score)

            user.wordle.points += score
            user.total += score
        }

        const saved_user = await user.save();

        res.status(200).send({ user: saved_user })
    }
    catch (e) {
        console.log(e);
        res.status(400).send(e);
    }
});

module.exports = router;