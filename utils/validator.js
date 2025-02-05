
const validateEmail = (email) =>{
    const emailRegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegExp.test(email);
}

const validateMobileNumber = (number) =>{
    const mobileRegExp = /^\d{10}$/;
    return mobileRegExp.test(number);
}

export {validateEmail, validateMobileNumber} 