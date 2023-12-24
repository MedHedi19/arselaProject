const data = require("../models/dataSchema");



async function createData(req, res) {
    const newData = new data(req.body);
    try {
        const savedData = await newData.save();
        res.status(200).json(savedData);

    } catch (err) {
        res.status(500).json(err);
    }
}
async function getData(req, res) {
    try {
        const docId = req.params.doc_id;
        const data = await data.findById(docId);
        res.status(200).json(data)


    } catch (err) {
        res.status(500).json(err);
    }
}
async function deleteData(req, res) {
    try {
        await data.findByIdAndDelete(req.params.id)
        res.status(200).json("data has been deleted....")
    } catch (err) {
        res.status(500).json(err)
    }
}

module.exports = {
    createData,
    getData,
    deleteData
}
