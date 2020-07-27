const express = require('express');
const route = express.Router();
const auth = require('../middleware/auth')
const User = require('../models/User');
const Contact = require('../models/Contact');
const { check, validationResult } = require('express-validator');

// @route      GET api/contacts
// @desc       Gets the contacts
// @access     private 
route.get('/', auth, async (req, res) => {
    try {
        const contacts = await Contact.find({ user: req.user.id }).sort({ date: -1 });

        res.status(200).json(contacts)
    } catch (error) {
        res.status(500).send('server error')
    }

})

// @route      POST api/contacts
// @desc       adds a contact
// @access     private 
route.post('/', [auth, [check('name', 'Please enter name').not().isEmpty()]],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(400).json({ errors: errors.array() })
        }
        else {
            const { name, email, phone, type } = req.body;
            try {
                let newContact = new Contact({
                    name,
                    email,
                    phone,
                    type,
                    user: req.user.id
                });
                const contact = await newContact.save();
                res.status(200).json(contact)
            } catch (error) {
                res.status(500).send('Server error')
            };

        }

    })

// @route      PUT api/auth/:id
// @desc       updates a contact
// @access     private 
route.put('/:id', auth, async (req, res) => {
    const { name, email, phone, type } = req.body;
    let contactFields = {};
    if (name) contactFields.name = name
    if (email) contactFields.email = email
    if (phone) contactFields.phone = phone
    if (type) contactFields.type = type

    try {
        let contact = await Contact.findById(req.params.id);
        if (!contact) {
            return res.status(404).json({ msg: "not found" })
        }
        // make sure user owns contact
        if (contact.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: "Not authorized" })
        }

        contact = await Contact.findByIdAndUpdate(req.params.id, { $set: contactFields }, { new: true });
        res.json(contact)
    } catch (error) {
        res.status(500).send('Server error')

    }

})

// @route      DELETE api/auth/:id
// @desc       updates a contact
// @access     private 
route.delete('/:id', auth,
    async (req, res) => {
        try {
            let contact = await Contact.findById(req.params.id);
            if (!contact) {
                return res.status(404).json({ msg: "not found" })
            }
            // make sure user owns contact
            if (contact.user.toString() !== req.user.id) {
                return res.status(401).json({ msg: "Not authorized" })
            }

            await Contact.findByIdAndRemove(req.params.id);
            res.json('contact Removed')
        } catch (error) {
            res.status(500).send('Server error')

        }


    })

module.exports = route;