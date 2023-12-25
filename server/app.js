const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connection = require('./config/db');
const app = express();
const userRoute = require("./routes/userRoute");

app.use(express.json());
app.use(cors());
dotenv.config();


connection()
    .then((res) => {
        app
            .listen(process.env.PORT || 5000, () => {
                console.log("backend server is running");
            })
    })
    .catch((err) => { console.log("There is an error not expected"); });

app.use("/", dataRoute);
app.use("/userAnswer", userRoute);
