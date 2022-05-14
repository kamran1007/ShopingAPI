// const { model, models } = require("mongoose")
// const { required } = require("nodemon/lib/config")
const cryptoJs = require('crypto-js');
const express = require('express');
const mongoose = require('mongoose');
const router = express.Router()
const UserLogin = require('../model/user')
const jwt = require('jsonwebtoken');
// const CryptoJs = require('crypto-js')

router.post('/register', async (req, res) => {
    const user = await new UserLogin({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        isAdmin:req.body.isAdmin,
        password: cryptoJs.AES.encrypt(
            req.body.password,
    
            process.env.PASS_SEC

        ).toString()
    
    })
    try {
        const a1 = await user.save()
        res.status(201).json(a1)
    } catch (err) {
        res.status(500).json('Error' + err)
    }
    console.log(user)


})

//LOGIN

router.post('/login', async (req, res) => {
    try {
        const user = await UserLogin.findOne({ name: req.body.name });
        !user && res.status(401).json("wroung credentials")
        const hashedPassword = cryptoJs.AES.decrypt(
            user.password,
            process.env.PASS_SEC
        );
        const orignalpassword = hashedPassword.toString(cryptoJs.enc.Utf8);
        orignalpassword !== req.body.password &&
            res.status(401).json("wroung credentials");

        const accessToken = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin,
        },
        process.env.jwt_sec,
        {expiresIn: "5d"}
        );
    

        const { password, ...other } = user._doc



        res.status(200).json({other, accessToken});
    } catch (error) {

        res.status(500).json(error);
    }

});

module.exports = router;