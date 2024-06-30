const express = require("express");
const router = express.Router();

const { handleAllgetUsers } = require("../controllers/user");


//APIs for JSON response
router.route("/")
.get(handleAllgetUsers)
.post(async (req,res) => {
    const body = req.body;

    if(!body ||
        !body.first_name ||
        !body.last_name || 
        !body.email ||
        !body.gender ||
        !body.job_title
    ) {
        return res.status(400).json({"message": "All fields are required"});
    }
    const result = await User.create({
        firstName : body.first_name,
        lastName : body.last_name,
        email:body.email,
        gender : body.gender,
        jobTitle : body.job_title

    });
    console.log(result);
    return res.status(201).json({"msg" : "Success"});
});

router.route("/:id")
.get(async (req,res) => {

    const user = await User.findById(req.params.id);
    return res.json(user);

}).patch(async (req,res) => {
    //TODO: Edit the use with id
    const id = req.params.id;
    const dataUpdate = req.body;
    // console.log(dataUpdate);
    const result = await User.updateOne(
        {_id : id},
        {$set: dataUpdate}
    );
    
    if(result.matchedCount === 0) {
        return res.status(404).json({error : "User not found"});
    }

    res.json({"msg" : "Updated successfully"});
    
}).delete(async (req,res)=> {
    //TODO: delete users with id
    const id = req.params.id;
    const result = await User.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
        return res.status(404).json({ error: "User not found" });
    }

    res.json({ msg: "Deleted successfully" });
    
})

module.exports = router;