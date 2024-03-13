require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

// app.use(cors({
//     credentials: true,
//     origin: ['http://localhost:8080', 'http://localhost:4200']
// }))

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(cookieParser());
app.use(morgan('dev'));


app.set('jwt-secret', process.env.JWT_SECRET)
app.set('jwt-refresh-secret', process.env.JWT_REFRESH_SECRET);
app.set('view engine', 'ejs');


require('./models');
require('./routes')(app);


var options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    tlsInsecure: true
}

const uri = process.env.MONGODB_URI;

mongoose.connect(uri, options)
    .then(() => {
        console.log('connected to mongodb')
    });


app.listen(3000, function () {
    console.log('API working on port ' + 3000);
});