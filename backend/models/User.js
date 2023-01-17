const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validator = require("validator");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        validate(value) {
            if (!value) throw new Error(`Name field is required.`);
        },
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid email address");
            }
        },
    },
    googleId: {
        type: String,
        unique: true,
        required: true,
    },
    imageUrl: {
        type: String,
        default: 'https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes.png'
    },
    chess: {
        Played: { type: Number },
        Wins: { type: Number },
        Losses: { type: Number },
    },
    candyCrush: {
        points: { type: Number },
        highScore: { type: Number },
    },
    wordle: {
        points: { type: Number },
        highScore: { type: Number },
    },
    ticTacToe: {
        points: { type: Number },
        highScore: { type: Number },
    },
    mario: {
        points: { type: Number },
        highScore: { type: Number },
    },
    tzfe: {
        points: { type: Number },
        highScore: { type: Number },
    },
    total: {
        type: Number
    },
    tokens: [
        {
            token: {
                type: String,
                required: true,
            },
        },
    ],
});

UserSchema.methods.generateAuthToken = async function () {
    try {
        if (this.tokens.length > 1) this.tokens.splice(0, 1);
        const token = jwt.sign({ email: this.email }, process.env.JWT_SECRET_KEY);
        this.tokens.push({ token: token });
        return token;
    } catch (e) {
        return e;
    }
};

const User = new mongoose.model("gamezone-user", UserSchema);

module.exports = User;
