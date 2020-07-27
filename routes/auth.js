const express = require('express');
const route = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

// @route      GET api/auth
// @desc       Gets the contacts
// @access     private 
route.get('/', auth, async (req, res) => {
    try {
        let user = await User.findById(req.user.id).select('-password');
        res.json(
            user
        )
    } catch (error) {
        res.status(500).send('Error')
    }

})

// @route      POST api/auth
// @desc       adds a contact
// @access     private 
route.post('/', [check('email', 'Please include an valid email').isEmail(),
check('password', 'Please enter a password with 6 or more characters').exists()],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() })
        }
        else {
            const { email, password } = req.body;

            try {
                let user = await User.findOne({ email });
                if (!user) {
                    res.status(400).json({
                        msg: "Invalid credentials"
                    })
                }
                else {
                    const isMatch = await bcrypt.compare(password, user.password);

                    if (!isMatch) {
                        res.status(400).json({
                            msg: "Invalid credentials"
                        })
                    }
                    else {
                        const payload = {
                            user: {
                                id: user.id
                            }
                        }

                        jwt.sign(payload, config.get('jwtSecret'), { expiresIn: 7200  }, (err, token) => {
                            if (err) throw err
                            else {
                                res.status(200).json({ token })
                            }
                        })
                    }
                }
            } catch (error) {
                res.status(500).send('Server error')
            }

        }


    })

module.exports = route;

