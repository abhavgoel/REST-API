const express = require("express");
const { connectMongoDb } = require("./connection");
const app = express();
const userRouter = require("./routes/user");

const { logReqRes } = require("./middlewares/index")

const PORT  = 3000;

//middleware
app.use(express.urlencoded({extended:false}));

connectMongoDb("mongodb://127.0.0.1:27017/CRUD_practice_db");

app.use(logReqRes("serverlog.txt"));
app.use("/users", userRouter);

app.listen(PORT,function() {
    console.log("Server started at PORT " + PORT);
})