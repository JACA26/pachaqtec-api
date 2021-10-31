const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');



let Schema = mongoose.Schema;


let usuarioSchema = new Schema({
    
    firstName: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    
    lastName: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    
    birthDate: {
        type: String,
        required: [true, 'La fecha de nacimiento es necesaria']
    },
    
    email: {
        type: String,
        unique: true,
        required: [true, 'El correo es necesario']
    },
    
    phone:{
        type: String,
        required: [true, 'El teléfono es necesario']
    },
    
    campus:{
        type: String,
        required: [true, 'El campus es necesario']
    },
    
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria']
    },
    
    image: {
        type: String,
        required: false,
    },
    
    state: {
        type: Boolean,
        default: true
    },
    
    description:{
        type: String,
        required: false,
        default: 'Sin descripción'
    },
    
    speciality:{
        type: String,
        required: [true, 'La especialidad es necesaria']
    }
});




usuarioSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser único' });


module.exports = mongoose.model('Usuario', usuarioSchema);