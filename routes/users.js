const express = require('express');
const route = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

// @route      POST api/users
// @desc       Register a users
// @access     Public 
route.post('/', [check('name', 'Please enter name').not().isEmpty(),
check('email', 'Please include a valid email').isEmail(),
check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            })
        }
        else {
            const { name, email, password } = req.body;

            try {
                let user = await User.findOne({ email: email });
                if (user) {
                    return res.status(400).send({
                        msg: "User already exists"
                    })

                }
                user = new User({
                    name: name,
                    email: email,
                    password: password
                });

                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(password, salt);
                await user.save();

                const payload = {
                    user: {
                        id: user.id
                    }
                }

                jwt.sign(payload, config.get('jwtSecret'), {
                    expiresIn: 7200
                }, (err, token) => {
                    if (err) throw err
                    else {
                        res.json({ token })
                    }
                })

            } catch (error) {
                res.status(500).send("err")
            }

        }

    })

module.exports = route;