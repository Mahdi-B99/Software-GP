const express = require("express");
const app =express();
require('dotenv').config
const port = 4000;
const cors = require("cors")
app.set("view engine", "ejs")
app.use(express.urlencoded({ extended : true}))
app.use(express.json())
app.use(cors())
const indexRouter = require('./routes/index');
const { request } = require("express");
app.use('/',indexRouter)


app.listen(port , () => {
    console.log(`Listening at http://localhost:${port}`)
})