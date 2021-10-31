

const menProfile = 'https://res.cloudinary.com/ds44jxjqj/image/upload/v1635532957/pachaqtec/abzdz0w3qnrhlpjgzhts.png';

const womanProfile = 'https://res.cloudinary.com/ds44jxjqj/image/upload/v1635532957/pachaqtec/uig60akax8jl93d4rkr3.png';

const arrayProfile = [menProfile, womanProfile];

const randomProfile = () => {
    const chooseProfile = Math.floor(Math.random() * arrayProfile.length);
    
    return arrayProfile[chooseProfile];
}

module.exports = {
    menProfile,
    womanProfile,
    randomProfile
}