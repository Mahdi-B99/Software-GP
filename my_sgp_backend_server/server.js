const express = require("express");
const app =express();
const port = 3001
const cors = require("cors")
app.set("view engine", "ejs")
app.use(express.urlencoded({ extended : true}))
app.use(express.json())
app.use(cors())
const indexRouter = require('./routes/index');
app.use('/',indexRouter)


app.listen(port , () => {
    console.log(`Listening at http://localhost:${port}`)
})
