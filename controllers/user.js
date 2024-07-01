const User = require("../models/user")

async function handleAllgetUsers(req,res) {
    const allUsers = await User.find();

    return res.json(allUsers);
}

async function handleGetUserById(req,res) {
    const user = await User.findById(req.params.id);

    if(!user) {
        res.status(404).json({"msg": "user not found"});
    }
    return res.json(user);

}

async function handleUpdateUserById(req,res) {
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
}

async function handleDeleteUserById(req,res) {
    const id = req.params.id;
    const result = await User.deleteOne({ _id: id });

    if (result.deletedCount === 0) {
        return res.status(404).json({ error: "User not found" });
    }

    res.json({ msg: "Deleted successfully" });
}

async function handleCreateUser(req,res) {
    const body = req.body;

    if(!body ||
        !body.firstName ||
        !body.lastName || 
        !body.email ||
        !body.gender ||
        !body.jobTitle
    ) {
        return res.status(400).json({"message": "All fields are required"});
    }
    const result = await User.create({
        firstName : body.firstName,
        lastName : body.lastName,
        email:body.email,
        gender : body.gender,
        jobTitle : body.jobTitle

    });
    // console.log(result);
    return res.status(201).json({"msg" : "Success" ,id: result._id});
}

module.exports = {
    handleAllgetUsers,
    handleGetUserById,
    handleUpdateUserById,
    handleDeleteUserById,
    handleCreateUser
}