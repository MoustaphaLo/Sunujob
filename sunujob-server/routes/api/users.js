const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');

const validateRegister = require('../../validation/register');
const validateLogin = require('../../validation/login');
const multer = require("multer");
const cors = require("cors");
const bodyParser = require("body-parser");
const GridFsStorage = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
const crypto = require("crypto");

const User = require('../../models/User');
const { Router } = require('express');

router.post('/register', (req, res) => {
    const { errors, isValid } = validateRegister(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }
    User.findOne({ email: req.body.email }).then(user => {
        if (user) {
            return res.status(400).json({ email: "Cet email est déjà utilisé" });
        } else {
            const newUser = new User({
                nom: req.body.nom,
                prenom: req.body.prenom,
                email: req.body.email,
                password: req.body.password
            });

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                    .save()
                    .then(user => res.json(user))
                    .catch(err => console.log(err));
                });
            });
        }
    });
});

router.post('/login', (req, res) => {
    const { errors, isValid } = validateLogin(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email }).then(user => {

        if(!user) {
            return res.status(404).json({ emailnotfound: 'Aucun utilisateur ne correspond à cet email!'});
        }

        bcrypt.compare(password, user.password).then(isMatch => {
            if (isMatch) {
                const payload = {
                    id: user.id,
                    nom: user.nom
                };

                jwt.sign(
                    payload,
                    keys.secretOrKey,
                    {
                        expiresIn: 31556926
                    },
                    (err, token) => {
                        res.json({
                            success: true,
                            token: 'Bearer ' + token
                        });
                    }
                );
            } else {
                return res.status(400).json({ passwordincorrect: "Mot de passe incorrecte!"});
            }
        });
    });
});

/*router.get('/profil/:id', (req, res, next) =>{
    User.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error)
        } else {
            return res.json(data);
        }
    })
});

router.get('/profil/:id', (req, res) => {
    User.findOne({_id:req.params.id}, (error, data) => {
        if (error) {
            return next(error)
        } else {
            return res.json(data);
        }
    })
        
    })

router.post('/edit-profil', function(req, res, next) {
    User.update({_id: req.user._id}, {$set: req.body}, {
        nom: req.body.nom,
        prenom: req.body.prenom,
        email: req.body.email,
        password: req.body.password

    }, function(err) {
        if (err) console.log(err);
        res.render('profil', {
            user: req.user
        })
    })

})*/
// https://github.com/TheLordA/Instagram-Web-App-MERN-Stack-Clone/blob/master/server/routes/user.js
router.put("/update-profil-picture", (req, res) => {
    User.findByIdAndUpdate(
        req.user._id,
        { $set: { photo: req.body.photo, photoType: req.body.photoType}},
        { new: true },
        (err, result) => {
            if (err) {
                return res.status(422).json({ error: "Erreur, réessayez!"});
            }
            res.json(result);
        }
    );
});


router.put('/update-profil/:id', (req, res, next) => {
    User.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json(data);
        }
    })
})

module.exports = router;