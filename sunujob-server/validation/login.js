const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateLogin(data) {
    let errors = {};

    data.email = !isEmpty(data.email) ? data.email : "";
    data.password  = !isEmpty(data.password) ? data.password : "";

    if (Validator.isEmpty(data.email)) {
        errors.email = "Veuillez entrer votre email";
    } else if (!Validator.isEmail(data.email)) {
        errors.email = "L'email est invalide";
    }

    if (Validator.isEmpty(data.password)) {
        errors.password = "Veuillez entrer un mot de passe!";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};