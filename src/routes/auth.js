const express = require("express");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const { UserModel } = require("../model/user.model");


const router = express.Router();

router.post('/signup', async function (req, res) {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "Please fill in all fields." });
    }

    const user = await UserModel.findOne({ email });
    if (user) {
        return res.status(400).json({ message: "Email already in use." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({ name, email, password: hashedPassword });
    await newUser.save();
    res.json({ message: "User created successfully." });
})

router.post('/signin', async function (req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Please fill in all fields." })
    }

    const user = await UserModel.findOne({ email });
    if (!user || (await bcrypt.compare(password, user.password)) === false) {
        return res.status(400).json({ message: "Invalid email or password." })
    }

    const token = JWT.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ message: 'Sign in successfully', token })
})

module.exports = router;