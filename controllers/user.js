const User = require("../models/user")

async function handleAllgetUsers(req,res) {
    const allUsers = await User.find();

    return res.json(allUsers);
}

module.exports = {
    handleAllgetUsers,
}