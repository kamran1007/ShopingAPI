const { verifyToken, varifyTokenAndAuthorization, varifyTokenAndAdmin } = require('../routers/veriftToken');
const express = require('express');
const Address = require('../model/address');
const router = express.Router()


//create address

router.post("/", verifyToken, async (req, res) => {
    const newaddress = new Address(req.body);

    try {
        const savedaddress = await newaddress.save();
        res.status(200).json(savedaddress);
    } catch (err) {
        res.status(500).json(err);
    }
});
//update address
router.put('/:id', varifyTokenAndAdmin, async (req, res) => {

    try {
        const addressUpdate = await address.findByIdAndUpdate(req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        res.status(200).json(addressUpdate);
    } catch (err) {
        res.status(500).json(err)
    }

});
//delete address
router.delete('/:id', varifyTokenAndAdmin, async (req, res) => {
    try {
        await address.findByIdAndDelete(req.params.id)
        res.status(200).json('address has been deleted')
    } catch (error) {
        res.status(500).json(error)

    }
});

//GET USER address
router.get("/find/:userId", varifyTokenAndAuthorization, async (req, res) => {
    try {
        const addresss = await address.findOne({ userId: req.params.userId });
        res.status(200).json(addresss);
    } catch (err) {
        res.status(500).json(err);
    }
});

// //GET ALL

router.get("/", varifyTokenAndAdmin, async (req, res) => {
    try {
        const addresss = await address.find();
        res.status(200).json(addresss);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router