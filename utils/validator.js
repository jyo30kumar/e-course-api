
const validateEmail = (email) =>{
    const emailRegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegExp.test(email);
}

const validator = {
    validateEmail
}

export {validator} 