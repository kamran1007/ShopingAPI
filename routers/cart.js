const { verifyToken, varifyTokenAndAuthorization, varifyTokenAndAdmin } = require('../routers/veriftToken');
const express = require('express');
const Cart = require('../model/cart');
const router = express.Router()


//create product

router.post("/", verifyToken, async (req, res) => {
    const newcart = new Cart(req.body);

    try {
        const savedcart = await newcart.save();
        res.status(200).json(savedcart);
    } catch (err) {
        res.status(500).json(err);
    }
});
//update product
router.put('/:id', varifyTokenAndAuthorization, async (req, res) => {

    try {
        const cartUpdate = await Cart.findByIdAndUpdate(req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        res.status(200).json(cartUpdate);
    } catch (err) {
        res.status(500).json(err)
    }

});

//GET USER CART
router.get("/find/:userId", varifyTokenAndAuthorization, async (req, res) => {
    try {
        const Cart = await Cart.findOne({ userId: req.params.userId });
        res.status(200).json(Cart);
    } catch (err) {
        res.status(500).json(err);
    }
});

// //GET ALL

router.get("/", varifyTokenAndAdmin, async (req, res) => {
    try {
        const carts = await Cart.find();
        res.status(200).json(carts);
    } catch (err) {
        res.status(500).json(err);
    }
});






module.exports = router