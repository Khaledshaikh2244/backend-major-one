
require("dotenv").config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const authRoute = require("./routes/auth");
const jobRoute = require("./routes/job");
const cors = require('cors');


app.use(express.json());
app.use(cors());

    
// const port = 3000;
const port = process.env.port || 3001;


app.get("/health", (req, res) => {
    console.log("I am health api !");

    res.json({
        service: "Backend Job Listing API Server",
        status: "active",
        time: new Date(),
    });
});


//writing some prefixe and versioning of API (backward compability if some needed further)
//apis related to auth
app.use("/api/v1/auth" , authRoute);
app.use("/api/v1/job" , jobRoute);


//global middleware handler
app.use((error , req , res, next)=> {
     console.log(error);
    res.status(500).json({errorMessage : "Something went wrong!"});
    })

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
// file can be open via vim
