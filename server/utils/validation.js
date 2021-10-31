

const { isEmpty } = require('underscore');
const passwordValidator = require('password-validator');
const validator = require('email-validator');
// var isDate = require('date-fns/isDate');
// const isMatch = require('date-fns/isMatch');


const validatePassword = (password) =>{
    
    const passSchema = new passwordValidator();
    
    passSchema
    .is().min(6)                                  
    .is().max(16)
    .has().digits(1)
    .has().not().spaces()
    .is().not().oneOf(['Passw0rd', 'Password123', 'admin123']); // Blacklist
    
    // Get a full list of rules which failed
    // console.log(passSchema.validate('admin123', { list: true }));
    
    return passSchema.validate(password);
}

const validatePhone = (phoneNumber) => {
    
    const regexPhone = new RegExp(/^(([\+]{1}[51]{2}[9]{1}[0-9]{8}))$/)
    
    return regexPhone.test(phoneNumber)
}

const validateDate = (date) => {
    const regexDate = new RegExp(/^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/);
    
    // const regexDate = new RegExp(/^([0]?[1-9]|[1|2][0-9]|[3][0|1])[./-]([0]?[1-9]|[1][0-2])[./-]([0-9]{4}|[0-9]{2})$/);
    
    return regexDate.test(date);
}

const validateFormData = (data) => {
    
    let errors = {};
    
    if(data.firstName === '' || !data.firstName) {
        errors.firstName = 'Name is required'
    }
    
    if(data.lastName === '' || !data.lastName) {
        errors.lastName = 'Name is required'
    }
    
    if(data.birthDate === '' || !data.birthDate) {
        errors.birthDate = 'Birth Date is required'
    }else if(!validateDate(data.birthDate)){
        errors.birthDate = 'Birth Date is invalid'
    }
    
    if(data.email === '' || !data.email) {
        errors.email = 'Email is required'
    }else if(!validator.validate(data.email)){
        errors.email = 'Email is invalid'
    }
    
    if(data.phone === '' || !data.phone) {
        errors.phone = 'Phone is required'
    }else if(!validatePhone(data.phone)){
        errors.phone = 'Phone is invalid'
    }
    
    if(data.campus === '' || !data.campus) {
        errors.campus = 'Campus is required'
    }
    
    if(data.password === '' || !data.password) {
        errors.password = 'Password is required'
    }else if(!validatePassword(data.password)){
        errors.password = 'Password is invalid'
    }
    
    if(data.speciality === '' || !data.speciality) {
        errors.speciality = 'Speciality is required'
    }
    
    return {
        errors,
        isValid: isEmpty(errors)
    }
    
}


const validateToUpdateUser = (data) =>{
    let errors = {};
    
    if(data.firstName === '' || !data.firstName) {
        errors.firstName = 'First Name is required'
    }
    
    if(data.lastName === '' || !data.lastName) {
        errors.lastName = 'Last Name is required'
    }
    
    if(data.birthDate === '' || !data.birthDate) {
        errors.birthDate = 'Birth Date is required'
    }else if(!validateDate(data.birthDate)){
        errors.birthDate = 'Birth Date is invalid'
    }
    
    if(data.password){
        if(!validatePassword(data.password)){
            errors.password = 'Password is invalid'
        }else if(!validatePassword(data.newPassword)){
            errors.password = 'New password is invalid'
        }else if(data.password !== data.newPassword){
            errors.passwordConfirm = 'Passwords not matched'
        }
    }
    
    return {
        errors,
        isValid: isEmpty(errors)
    }
}


const validateToUpdateProfile = (data) => {
    let errors = {};
    
    if(data.description === '' || !data.description) {
        data.description = '';
    }
    
    if(data.speciality === '' || !data.speciality) {
        data.speciality = '';
    }
    
    if(data.phone === '' || !data.phone) {
        data.phone = '';
    }
    
    if( data.campus === '' || !data.campus) {
        errors.campus = 'campus is required'
    }
    
    return {
        errors,
        isValid: isEmpty(errors)
    }
}



module.exports = {
    validatePassword,
    validatePhone,
    validateDate,
    validateFormData,
    validateToUpdateUser,
    validateToUpdateProfile
}