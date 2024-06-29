const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require("fs");
const app = express();

const PORT  = 3000;

app.use(express.urlencoded({extended:false}));

//routes

//api to return HTML resposne
app.route("/users")
.get(function(req,res) {
    const html = `
    <ul>
        ${users.map((user) =>`<l1> ${user.first_name} <\li>`).join("")}
    </ul>
    `;
    return res.send(html);
});

//APIs for JSON response
app.route("/api/users")
.get(function(req,res) {
    return res.json(users);

}).post((req,res) => {
    const body = req.body;
    users.push({...body , id: users.length + 1});
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err,data) => {
        return res.json({status: "Success" , id: users.length});
    })
});

app.route("/api/users/:id")
.get((req,res) => {
    const id = Number(req.params.id);
    const user  = users.find((user) => {
        return user.id===id;
    })
    return res.json(user);
}).patch((req,res) => {
    //TODO: Edit the use with id
    const body = req.body;
    const id = Number(req.params.id);
    const userIndex = users.findIndex((user) => user.id===id);

    if(userIndex === -1) {
        return res.status(404).json({"message" : "user not found"});
    }

    users[userIndex] = Object.assign({},users[userIndex],body);
    
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users) ,(err,data) => {
        return res.json({"status" : "user updated successfully" , ...users[userIndex]});
    })
    
}).delete((req,res)=> {
    //TODO: delete usern with id
    const body = req.body;
    const id = Number(req.params.id);
    const userIndex = users.findIndex((user)=>user.id===id);

    if(userIndex === -1) {
        return res.status(404).json({"message" : "user not found"});
    }

    users.splice(userIndex,1);
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users) ,(err,data) => {
        return res.json({"status" : "user deleted successfully"});
    })
})


app.listen(PORT,function() {
    console.log("Server started at PORT " + PORT);
})