const { varifyToken, varifyTokenAndAuthorization, varifyTokenAndAdmin } = require('../routers/veriftToken');
const User = require('../model/user')
const express = require('express')
const router = express.Router()
const cryptoJs = require('crypto-js')

//update

router.put('/:id', varifyTokenAndAuthorization, async (req, res) => {
    if (req.body.password) {
        req.body.password = cryptoJs.AES.encrypt(
            req.body.password,
            process.env.PASS_SEC
        ).toString()
    }
    try {
        const UserUpdate = await User.findByIdAndUpdate(req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        res.status(200).json(UserUpdate);
    } catch (err) {
        res.status(500).json(err)
    }

})
//deleted//
router.delete('/:id', varifyTokenAndAuthorization, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json('user has been deleted')
    } catch (error) {
        res.status(500).json(error)

    }
})
//get User

router.get('/find/:id', varifyTokenAndAdmin, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const { password, ...others } = user._doc;
        res.status(200).json(others);
    } catch (err) {
        res.status(500).json(err);
    }
});

//get user all
router.get('/', varifyTokenAndAdmin, async (req, res) => {
    const query = req.query.new;
    try {
        const users = query
            ? await User.find().sort({ _id: -1 }).limit(5)
            : await User.find();



        res.status(200).json(users);
    } catch (error) {
        res.status(500).json(error)

    }
});
//Get User stats
router.get("/stats", varifyTokenAndAdmin, async (req, res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

    try {
        const data = await User.aggregate([
            { $match: { createdAt: { $gte: lastYear } } },
            {
                $project: {
                    month: { $month: "$createdAt" },
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: 1 },
                },
            },
        ]);
        res.status(200).json(data)
    } catch (err) {
        res.status(500).json(err);
    }
});
module.exports = router