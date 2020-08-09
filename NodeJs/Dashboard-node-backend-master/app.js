const path = require('path');

const express = require('express');

const app = express();
const cors = require('cors')
const homerouter = require('./routes/home')
const userRouter = require('./routes/user')
const contactRouter = require('./routes/contact')


const productRouter = require('./routes/store')

// const ProductRouter=require('./routes/store')
const orderRouter=require('./routes/order')

const sequelize = require('./util/database')
const Product = require('./models/product')
const User = require('./models/user')
const Order = require('./models/order')


const OrderItem = require('./models/orderItem')
const Slider = require('./models/slider')

const dashboardRouter = require('./routes/dashboard')

app.use(express.static(path.join(__dirname, "public")));
app.use('/images',express.static(__dirname+'/images'))

Product.belongsTo(User);
User.hasMany(Product);

// User.belongsToMany(Product, { through: Order });
// Product.belongsToMany(User, { through: Order });

Order.belongsTo(User);
User.hasMany(Order);

Order.belongsToMany(Product, { through: OrderItem })
Product.belongsToMany(Order, {through : OrderItem})


sequelize
    .sync({force : true})
    .then(result => {
        app.listen(3000);
    })
    .catch(err => {
        console.log(err)
    })

const port = process.env.PORT || 5000;




app.use(cors())
//Parse user's data
app.use(express.json());
app.use(express.urlencoded());

//Middleware routes
app.use('/api/home', homerouter)

app.use('/api/contact',contactRouter)


app.use('/api/store', productRouter)

app.use('/api/user', userRouter)
// app.use('/api/product',ProductRouter)
app.use('/api/order',orderRouter)


app.use('/api/dashboard' , dashboardRouter)


//Catch all & Error handler 
app.use((req, res, next) => {
    res.status(404).json({ message: 'route not found' })
})

app.use((err, req, res, next) => {
    console.log("Error in ERROR MIDDLEWARE");
    res.status(500).json({ message: 'something went wrong' })
})

//Server Listening
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
})