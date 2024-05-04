
require("dotenv").config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const authRoute = require("./routes/auth");

app.use(express.json());

const port = 3000;


app.get("/health", (req, res) => {
    console.log("I am health api !");

    res.json({
        service: "Backend Job Listing API Server",
        status: "active",
        time: new Date(),
    });
});


//writing some prefixe and versioning of API (backward compability)
//apis related to auth
app.use("/api/v1/auth" , authRoute);

mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log("DB Connected !");
}).catch((error) => {
    console.log("DB Failed To Connect ", error);
});

app.listen(port, (err) => {
    if (!err) {
        console.log(`server is up and running on ${port}`);
    }
});
