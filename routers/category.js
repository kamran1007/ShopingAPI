const { verifyToken, varifyTokenAndAuthorization, varifyTokenAndAdmin } = require('../routers/veriftToken');
const express = require('express');
const Categories = require('../model/categories');
const router = express.Router()


//create product

router.post("/", verifyToken, async (req, res) => {
    const newcategories = new Categories(req.body);

    try {
        const savecategories = await newcategories.save();
        res.status(200).json(savecategories);
    } catch (err) {
        res.status(500).json(err);
    }
});
//update product
router.put('/:id', varifyTokenAndAuthorization, async (req, res) => {

    try {
        const categoriesUpdate = await Categories.findByIdAndUpdate(req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        res.status(200).json(categoriesUpdate);
    } catch (err) {
        res.status(500).json(err)
    }

});

//GET USER CART
router.get("/find/:userId", varifyTokenAndAuthorization, async (req, res) => {
    try {
        const categories = await Categories.findOne({ userId: req.params.userId });
        res.status(200).json(categories);
    } catch (err) {
        res.status(500).json(err);
    }
});

// //GET ALL

router.get("/", varifyTokenAndAdmin, async (req, res) => {
    try {
        const categories = await Categories.find();
        res.status(200).json(categories);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router