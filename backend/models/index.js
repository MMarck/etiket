const nodbConfig = require("../config/nodb.config.js");
const mongoose = require('mongoose');

//const db_path = nodbConfig.dialect + '://' + nodbConfig.HOST + '/' + nodbConfig.noDB;
const db_path = "mongodb+srv://" + nodbConfig.USER +":"+ nodbConfig.PASSWORD + "@"+nodbConfig.HOST +"/?retryWrites=true&w=majority";
const config = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    poolSize: 4
}


mongoose.connect(db_path)
    .then(() => console.log('DB connnection successful!'))
    .catch(err => {
        console.error.bind(console, 'MongoDB connection error:')
    });