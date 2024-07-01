const express = require("express");
const router = express.Router();

const { handleAllgetUsers, 
    handleGetUserById,
    handleUpdateUserById,
    handleDeleteUserById,
    handleCreateUser } = require("../controllers/user");


//APIs for JSON response
router.route("/")
.get(handleAllgetUsers)
.post(handleCreateUser);

router.route("/:id")
.get(handleGetUserById)
.patch(handleUpdateUserById)
.delete(handleDeleteUserById);

module.exports = router;