const express = require("express");
const { connectMongoDb } = require("./connection");
const app = express();
const userRouter = require("./routes/user");

const { logReqRes } = require("./middlewares/index")

const PORT  = 3000;

//middleware
app.use(express.urlencoded({extended:false}));
app.use(logReqRes("serverlog.txt"));


//connection
connectMongoDb("mongodb://127.0.0.1:27017/CRUD_practice_db").then(() => console.log("MongoDB connected!"));

//routes
app.use("/api/users", userRouter);

app.listen(PORT,function() {
    console.log("Server started at PORT " + PORT);
})