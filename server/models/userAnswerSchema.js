const mongoose = require("mongoose");

const userAnswerSchema = new mongoose.Schema(
    {
        answerData: { type: Array, required: true, },
    },
    { timestamps: true }
);

module.exports = mongoose.model("userAnswer", userAnswerSchema);