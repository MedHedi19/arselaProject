const mongoose = require("mongoose");

const DataSchema = new mongoose.Schema(
    {
        documentName: { type: String, required: true, },
        docDesc: { type: String, required: true },
        questions: { type: Array, required: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model("data", DataSchema);