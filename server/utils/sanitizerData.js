const _ = require('underscore');

//eliminar el password del usuario
const sanitizerPassword = (user) => {
    const userSanitized = _.pick(user, ['description','_id', 'firstName', 'lastName', 'email', 'birthDate', 'phone','campus','speciality']);
    return userSanitized;
}


const sanitizerProfile = (body) => {
    const bodySanitized = _.pick(body, ['description', 'phone', 'campus', 'speciality']);
    return bodySanitized;
}

const sanitizerUser = (body) => {
    
    if(!body.password || body.password === ''){
        const bodySanitized = _.pick(body, ['firstName', 'lastName', 'birthDate']);
        return bodySanitized;
    }
    const bodySanitized = _.pick(body, ['firstName', 'lastName', 'birthDate', 'password', 'newpassword']);
    return bodySanitized;
}


module.exports = {
    sanitizerPassword,
    sanitizerProfile,
    sanitizerUser
}