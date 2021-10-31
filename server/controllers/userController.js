
const bcrypt = require('bcrypt');
const { isEmpty } = require('underscore');
const _ = require('underscore');
const Usuario = require("../schemas/usuario");
const { sanitizerProfile, sanitizerUser } = require('../utils/sanitizerData');
const { randomProfile } = require('../utils/urlData');
const { validateFormData, validateToUpdateUser, validateToUpdateProfile } = require('../utils/validation');


//users

const getUsers = async (req, res) => {
    
    
    let limit = req.query.limit || 50;
    limit = Number(limit);
    
    try {
        const users = await Usuario.find({state: true}).limit(limit);
        return res.status(200).json({
            ok: true,
            users,
        });
        
    } catch (error) {
        return res.status(500).json({
            message: "Error al obtener usuarios",
            error
        });
    }
};

const getOneAllUserData = async (req, res) => {
    
    if(!req.params.id ){
        return res.status(400).json({
            ok: false,
            message: "No se ha enviado el id del usuario"
        });
    }
    
    const id = req.params.id;
    
    try {
        const user = await Usuario.findById(id);
        return res.status(200).json({
            ok: true,
            user,
        });
        
    } catch (error) {
        return res.status(500).json({
            message: "Error al obtener usuario",
            error
        });
    }
}

// const getOneUserToEdit = async (req, res) => {
    
//     if(!req.params.id ){
//         return res.status(400).json({
//             ok: false,
//             message: "No se ha enviado el id del usuario"
//         });
//     }
    
//     const id = req.params.id;
    
//     try {
//         const user = await Usuario.findById(id,'firstName lastName birthDate password ');
//         if(!user){
//             return res.status(400).json({
//                 ok: false,
//                 message: "Usuario no encontrado"
//             });
//         }
        
//         return res.status(200).json({
//             ok: true,
//             user,
//         });
        
//     } catch (error) {
//         return res.status(500).json({
//             message: "Error al obtener usuario",
//             error
//         });
//     }
// }

const createUser = async (req, res) => {
    
    if(isEmpty(req.body)){
        return res.status(400).json({
            ok: false,
            err: {
                message: 'No se recibieron datos'
            }
        });
    }
    
    let body = req.body;
    const { errors, isValid } = validateFormData(body);
    
    if (!isValid) {
        return res.status(400).json({
            ok: false,
            errors
        });
    }
    
    
    if(!body.image) {
        body.image = randomProfile();
    }
    
    const user = new Usuario({
        firstName: body.firstName,
        lastName: body.lastName,
        birthDate: body.birthDate,
        email: body.email,
        phone: body.phone,
        campus: body.campus,
        password: bcrypt.hashSync(body.password, 10),
        image: body.image,
        speciality: body.speciality,
    });
    
    try {
        const userDB = await user.save();
        return res.status(201).json({
            ok: true,
            user: userDB,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error al crear usuario",
            error
        });
    }
}

const updateUser = async (req, res) => {
    
    if(req.body = {}){
        return res.status(400).json({
            ok: false,
            err: {
                message: 'No se recibieron datos'
            }
        });
    }
    
    const id = req.params.id;
    const body = sanitizerUser(req.body);
    const { errors, isValid } = validateToUpdateUser(body);
    
    if (!isValid) {
        return res.status(400).json({
            ok: false,
            errors
        });
    }
    
    try {
        const user = await Usuario.findByIdAndUpdate(id, body, { new: true });
        return res.status(200).json({
            ok: true,
            user,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error al actualizar usuario",
            error
        });
    }
}


const deleteUser = async (req, res) => {
    
    if(!req.params.id ){
        return res.status(400).json({
            ok: false,
            err: {
                message: 'Id invalid'
            }
        });
    }
    
    const id = req.params.id;
    
    let cambiaEstado = {
        state: false
    };
    
    try {
        // Usuario.findByIdAndRemove
        const userDelete = await Usuario.findByIdAndUpdate(id, cambiaEstado, { new: true });
        
        if (!userDelete) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Usuario no encontrado'
                }
            });
        }
        
        return res.status(200).json({
            ok: true,
            message: 'Usuario eliminado',
        });
    } catch (error) {
        
        return res.status(500).json({
            message: "Error al eliminar usuario",
            error
        });
    }
}

//profiles

const getProfileUsers = async (req, res) => {
    
    let limit = req.query.limit || 50;
    limit = Number(limit);
    
    try {
        
        const usersProfiles = await Usuario.find({state: true}, '_id firstName lastName description speciality campus phone email').limit(limit);
        return res.status(200).json({
            ok: true,
            profiles: usersProfiles
        });
            
    } catch (error) {
        return res.status(500).json({
            message: "Error al obtener perfiles",
            error
        });
    }
    
}


const updateProfile = async(req, res) =>{
    
    if(req.body = {}){
        return res.status(400).json({
            ok: false,
            err: {
                message: 'No se recibieron datos'
            }
        });
    }
    
    const id = req.params.id;
    const body = sanitizerProfile(req.body);
    const { errors, isValid } = validateToUpdateProfile(body);
    
    if (!isValid) {
        return res.status(400).json({
            ok: false,
            errors
        });
    }
    
    try {
        const user = await Usuario.findByIdAndUpdate(id, body, { new: true });
        return res.status(200).json({
            ok: true,
            user,
        });
    } catch (error) {
        return res.status(500).json({
            message: "Error al actualizar perfil",
            error
        });
    }
}




module.exports = {
    getUsers,
    getProfileUsers,
    getOneAllUserData,
    getOneUserToEdit,
    createUser,
    updateUser,
    updateProfile,
    deleteUser,
}