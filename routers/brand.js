const { verifyToken, varifyTokenAndAuthorization, varifyTokenAndAdmin } = require('../routers/veriftToken');
const express = require('express');
const Brand = require('../model/brand');
const router = express.Router()


//create product

router.post("/brand", verifyToken, async (req, res) => {
    const newbrand = new Brand(req.body);

    try {
        const savebrand = await newbrand.save();
        res.status(200).json(savebrand);
    } catch (err) {
        res.status(500).json(err);
    }
});
//update product
router.put('/:id', varifyTokenAndAuthorization, async (req, res) => {

    try {
        const BrandUpdate = await Brand.findByIdAndUpdate(req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        res.status(200).json(BrandUpdate);
    } catch (err) {
        res.status(500).json(err)
    }

});

//GET USER CART
router.get("/find/:userId", varifyTokenAndAuthorization, async (req, res) => {
    try {
        const Brands = await Brand.findOne({ userId: req.params.userId });
        res.status(200).json(Brands);
    } catch (err) {
        res.status(500).json(err);
    }
});

// //GET ALL

router.get("/", varifyTokenAndAdmin, async (req, res) => {
    try {
        const Brands = await Brand.find();
        res.status(200).json(Brands);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router