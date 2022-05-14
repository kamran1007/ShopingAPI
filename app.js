const express = require('express')
const connectDB = require('./database/db');
const dotenv = require('dotenv')
const bodyparser = require('body-parser')
const AuthUser = require('./routers/auth')
const UserRoute = require('./routers/user')
const ProductRoute = require('./routers/product')
const cartRoute = require('./routers/cart')
const addressRoute = require('./routers/address')
const CheckoutRoute = require('./routers/checkout')
const ContactRouter = require('./routers/contact')
const BrandRouter = require('./routers/brand')
const CategoriesRouter = require('./routers/category')
// const mongoose = require('mongoose')
const morgan = require('morgan')
const app = express()

dotenv.config({ path: './config/config.env' })
const PORT = process.env.PORT

app.use(morgan('dev'))
app.use(bodyparser.urlencoded({ extended: true }))
app.use(express.json());

connectDB();


////Api//
app.use('/api', AuthUser)
app.use('/user', UserRoute)
app.use('/product', ProductRoute)
app.use('/cart', cartRoute)
app.use('/address', addressRoute)
app.use('/checkout', CheckoutRoute)
app.use('/contact', ContactRouter)
app.use('/brand', BrandRouter)
app.use('/category', CategoriesRouter )


app.listen(PORT, () => (console.log(`server is listening on: http://localhost:${PORT}`)))