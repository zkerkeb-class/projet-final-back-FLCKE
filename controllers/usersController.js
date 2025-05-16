const Users = require('../models/usersModel');
const handleRequest = require('../utils/handleRequest');

async function getUserById(req, res) {
    // Récupérer un utilisateur par ID
    const userId = req.params.id;
    const user = await Users.findOne({ _id: userId });
    handleRequest.verifyDataNotFound(user, res);

}
async function getAllUsers(req, res) {
    // Récupérer tous les utilisateurs
    const users = await Users.find();
    handleRequest.verifyDataNotFound(users, res);
}
async function deleteUser(req, res) {
    // Récupérer un utilisateur par ID
    const userId = req.params.id;
    const user = await Users.deleteOne({ _id: userId });
    handleRequest.verifyDataNotFound(user, res);
}
async function updateUser(req, res) {
    // Récupérer un utilisateur par ID
    const userId = req.params.id;
    const user = await Users.updateOne({ _id: userId }, req.body);
    handleRequest.verifyDataNotFound(user, res);
}

module.exports = {
    getUserById,
    getAllUsers,
    updateUser,
    deleteUser,
}