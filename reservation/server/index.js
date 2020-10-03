const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/dev')
const FakeDb = require('./fake-db');

const productRoutes = require('./routes/product');

const app = express();
app.use('/app/v1/products',productRoutes);

// app.get('/products', function (req, res) {
//     res.json({ 'success': true })
// });


const PORT = process.env.PORT || '3001'
app.listen(PORT, function () {
    console.log("I am runnning!")
});

mongoose.connect(config.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(
    ()=>{
        const fakeDb = new FakeDb();
        fakeDb.initDb();
        // fakeDb.seeDb();
    }
);