
const userAnswer = require("../models/userAnswerSchema");

async function createAnswer(req, res) {
    const newAnswer = new userAnswer(req.body);
    try {
        const savedAnswer = await newAnswer.save();
        res.status(200).json(savedAnswer);

    } catch (err) {
        res.status(500).json(err);
    }
}

module.exports = {
    createAnswer
}
