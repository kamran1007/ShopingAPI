const { verifyToken, varifyTokenAndAuthorization, varifyTokenAndAdmin } = require('../routers/veriftToken');
const express = require('express');
const Checkout = require('../model/checkout');
const router = express.Router()


//create order

router.post("/" , async (req, res) => {
    const neworder = new Checkout(req.body);

    try {
        const saveorder = await neworder.save();
        res.status(200).json(saveorder);
    } catch (err) {
        res.status(500).json(err);
    }
});
//update order
router.put('/:id', varifyTokenAndAuthorization, async (req, res) => {

    try {
        const orderUpdate = await Checkout.findByIdAndUpdate(req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        res.status(200).json(orderUpdate);
    } catch (err) {
        res.status(500).json(err)
    }

});
//delete arder
router.delete('/:id', varifyTokenAndAuthorization, async (req, res) => {
    try {
        await Checkout.findByIdAndDelete(req.params.id)
        res.status(200).json('order has been deleted')
    } catch (error) {
        res.status(500).json(error)

    }
});

//GET USER order
router.get("/find/:userId", varifyTokenAndAuthorization, async (req, res) => {
    try {
        const order = await Checkout.findOne({ userId: req.params.userId });
        res.status(200).json(order);
    } catch (err) {
        res.status(500).json(err);
    }
});

// //GET ALL

router.get("/", varifyTokenAndAdmin, async (req, res) => {
    try {
        const Order = await Checkout.find();
        res.status(200).json(Order);
    } catch (err) {
        res.status(500).json(err);
    }
});

//get income
router.get('/', varifyTokenAndAuthorization, async (req, res) => {
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(new Date().setDate(lastMonth.getMonth() - 1));

    try {
        const month = await Checkout.aggregate([
            { $match: { createdAt: { $gte: previousMonth } } },
            {
                $project: {
                    month: { $month: "$createdAt" },
                    sales: "$amount",
                },
                
                $group: {
                    _id: "$month",
                    total: { $sum: "$sales" }
                },
            
            },
        ]);
        res.status(200).json(month)
    } catch (error) {
    res.status(500).json(error)

}
});

module.exports = router