const { verifyToken, varifyTokenAndAuthorization, varifyTokenAndAdmin } = require('../routers/veriftToken');
const express = require('express');
const Contact = require('../model/contact');
const router = express.Router()


//create contact

router.post("/", async (req, res) => {
    const newcontact = new Contact(req.body);

    try {
        const savecontact = await newcontact.save();
        res.status(200).json(savecontact);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router