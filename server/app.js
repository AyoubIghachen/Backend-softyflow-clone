const express = require('express');
const cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

app.set('view engine', 'ejs');
// app.set('views', path_to_views_directory);

app.use(cors({
    credentials: true,
    origin: 'http://localhost:8080',
}))

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '50mb' }));

app.set('jwt-secret', 'formation-softyflow-2024')
app.use(cookieParser());

app.use(morgan('dev'))
require('./models');

var options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    tlsInsecure: true
}

const uri = 'mongodb://admin:Password123@ac-1x9raok-shard-00-00.hebktso.mongodb.net:27017,ac-1x9raok-shard-00-01.hebktso.mongodb.net:27017,ac-1x9raok-shard-00-02.hebktso.mongodb.net:27017/BamDB2?ssl=true&replicaSet=atlas-sa3t23-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0';

mongoose.connect(uri, options)
    .then(() => {
        console.log('connected to mongodb')
    });

require('./routes')(app);

app.listen(3000, function () {
    console.log('API working on port ' + 3000);
});
module.exports = app