const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config  = require('../config/dev');
const User = require('../model/user');

router.post('/login', function (req, res) {
    const { email, password } = req.body;
    if (!email) {
        //Invalid error
        return res.status(422).send({
            errors: {
                title: 'User error',
                detail: 'Please fill uemailsername'
            }
        })
    }
    if (!password) {
        //Invalid error
        return res.status(422).send({
            errors: {
                title: 'User error',
                detail: 'Please fill password'
            }
        })
    }

    User.findOne({ email }, function (err, foundUser) {
        if (err) {
            // error message
            return res.status(422).send({
                errors: {
                    title: 'User error',
                    detail: 'Something went to wrong'
                }
            })
        }
        if (!foundUser) {
            //Invalid error
            return res.status(422).send({
                errors: {
                    title: 'User error',
                    detail: 'User already exist'
                }
            })
        }
        if (!foundUser.hasSamePassword(password)) {
            return res.status(422).send({
                errors: {
                    title: 'User error',
                    detail: 'Incorrect password'
                }
            })
        }

        const token = jwt.sign({
            userId:foundUser.id,
            username: foundUser.username
          }, config.SECRET, { expiresIn: '1h' });
        return res.json(token)
    })

});

router.post('/register', function (req, res) {
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const confirmPassword = req.body.confirmPassword;

    if (!username) {
        //Invalid error
        return res.status(422).send({
            errors: {
                title: 'User error',
                detail: 'Please fill username'
            }
        })
    }
    if (!email) {
        //Invalid error
        return res.status(422).send({
            errors: {
                title: 'User error',
                detail: 'Please fill uemailsername'
            }
        })
    }
    if (!password) {
        //Invalid error
        return res.status(422).send({
            errors: {
                title: 'User error',
                detail: 'Please fill password'
            }
        })
    }
    if (password !== confirmPassword) {
        //Invalid error
        return res.status(422).send({
            errors: {
                title: 'User error',
                detail: 'Please check passwords'
            }
        })
    }
    User.findOne({ email }, function (err, foundUser) {
        if (err) {
            // error message
            return res.status(422).send({
                errors: {
                    title: 'User error',
                    detail: 'Something went to wrong'
                }
            })
        }
        if (foundUser) {
            //Invalid error
            return res.status(422).send({
                errors: {
                    title: 'User error',
                    detail: 'User already exist'
                }
            })
        }
        const user = new User({ username, email, password })
        user.save(function (error) {
            if (error) {
                // error message
                return res.status(422).send({
                    errors: {
                        title: 'User error',
                        detail: 'Something went to wrong'
                    }
                })
            }
            return res.json({ "registerd": true })
        })

    })
    // res.json({'ok':true})
    // Product.findById(productId,function(err,foundProduct){
    //     if(err){
    //         return res.status(422).send({
    //             errors:{
    //                 title:'Product error',
    //                 detail:'Product not found'
    //             }
    //         })
    //     }
    // return res.json({ username, password, email })
    // })
    // res.json({'ok':true})
});

module.exports = router