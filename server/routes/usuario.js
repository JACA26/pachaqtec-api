// ============================
//  Requires
// ============================

const express = require('express');
const {verificarToken} = require('../middlewares/auth');
const { getUsers, createUser, updateUser, deleteUser, getOneAllUserData, getOneUserToEdit, getProfileUsers, updateProfile } = require('../controllers/userController');
const router = express.Router();


//users

router.get('/users/:id', verificarToken, getOneAllUserData);

router.get('/users/edit/:id', verificarToken, getOneUserToEdit);

router.post('/users', createUser);

router.put('/users/:id', verificarToken, updateUser);



//profiles

router.put('/users/profiles/:id', verificarToken, updateProfile);

module.exports = router;