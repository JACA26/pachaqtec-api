const Usuario = require("../schemas/usuario");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { sanitizerPassword } = require("../utils/sanitizerData");


const userLogin = async (req, res) =>{
    
    const {email, password} = req.body;
    let authUser = await Usuario.findOne({email});
    
    if(!authUser){
        return res.status(400).json({
            ok: false,
            message: 'This user does not exist'
        });
    }
    
    if(!bcrypt.compareSync(password, authUser.password)){
        return res.status(400).json({
            ok: false,
            message: 'Incorrect password'
        });
    }
    
    const user = sanitizerPassword(authUser);
    
    const token = jwt.sign({
        user
    }, process.env.SEED, {expiresIn: process.env.EXPIRES_IN});
    
    return res.json({
        ok: true,
        user,
        token
    });
    
}


module.exports = {
    userLogin
}