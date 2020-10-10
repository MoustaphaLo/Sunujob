const Validator = require('validator');
const isEmpty = require('is-empty');

module.exports = function validateRegister(data) {
    let errors = {};

    data.nom = !isEmpty(data.nom)? data.nom : "";
    data.prenom = !isEmpty(data.prenom) ? data.prenom : "";
    data.email = !isEmpty(data.email) ? data.email : "";
    data.password = !isEmpty(data.password) ? data.password : "";
    data.passwordConfirm = !isEmpty(data.passwordConfirm) ? data.passwordConfirm : "";

    if(Validator.isEmpty(data.nom)) {
        errors.nom = "Veuillez rempli le champ nom!";
    }

    if(Validator.isEmpty(data.prenom)) {
        errors.prenom = "Veuillez rempli le champ prenom!";
    }

    if(Validator.isEmpty(data.email)) {
        errors.email = "Veuillez rempli le champ email!";
    } else if (!Validator.isEmail(data.email)) {
        errors.email = '\'email est invalide!';
    }

    if(Validator.isEmpty(data.password)) {
        errors.password = "Veuillez rempli le champ password!";
    }

    if(Validator.isEmpty(data.passwordConfirm)) {
        errors.passwordConfirm = "Veuillez rempli le champ de confirmation du mot de passe!";
    }

    if(!Validator.isLength(data.password, {min: 8, max: 20})) {
        errors.password = "Le mot de passe doit contenir au moins 8 caractères!";
    }

    if (!Validator.equals(data.password, data.passwordConfirm)) {
        errors.passwordConfirm = "Les mots de passe doivent être identiques";
    }

    return {
        errors,
        isValid: isEmpty(errors)
    };
};