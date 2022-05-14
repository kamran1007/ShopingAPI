const { varifyToken, varifyTokenAndAuthorization, varifyTokenAndAdmin } = require('../routers/veriftToken');
const express = require('express');
const product = require('../model/product');
const router = express.Router()

//create product

router.post("/", varifyTokenAndAdmin, async (req, res) => {
    const newProduct = new Product(req.body);

    try {
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);
    } catch (err) {
        res.status(500).json(err);
    }
});

//update product
router.put('/:id', varifyTokenAndAdmin, async (req, res) => {
    
    try {
        const productUpdate = await User.findByIdAndUpdate(req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        res.status(200).json(productUpdate);
    } catch (err) {
        res.status(500).json(err)
    }

})

//delete product

router.delete('/:id', varifyTokenAndAdmin, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json('product has been deleted')
    } catch (error) {
        res.status(500).json(error)

    }
})

//get product

router.get('/find/:id', async (req, res) => {
    try {
        const productget = await product.findById(req.params.id);
        
        res.status(200).json(productget);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/', async (req, res) => {
    const query = req.query.new;
    try {
        const products = query
            ? await product.find().sort({ _id: -1 }).limit(5)
            : await product.find();



        res.status(200).json(products);
    } catch (error) {
        res.status(500).json(error)

    }
});
module.exports = router;