const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/dev');
const bodyParser = require('body-parser');
const FakeDb = require('./fake-db');

const productRoutes = require('./routes/product');
const userRoutes = require('./routes/users');
const path = require('path');
const app = express();
app.use(bodyParser.json());

app.use('/api/v1/products',productRoutes);
app.use('/api/v1/users',userRoutes);

const appPath = path.join(__dirname,'..','dist','reservation');
app.use(express.static(appPath));
app.get("*",function(req,res){
    res.sendFile(path.resolve(appPath,'index.html'))
} )

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