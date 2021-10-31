// ============================
//  Requires
// ============================

const express = require('express');
const {verificarToken} = require('../middlewares/auth');
const { createUser} = require('../controllers/userController');
const router = express.Router();


//users


router.post('/users', createUser);



module.exports = router;