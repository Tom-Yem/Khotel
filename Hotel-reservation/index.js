let config = require('config');
const book = require('./Routes/common_routes/Book');
const admin = require('./Routes/Admin_routes/Admin');
const static = require('./Statics/statics');
const mongoose = require('mongoose');
const express = require('express');
const app  = express();

mongoose.connect(config.get('db'),{ useNewUrlParser: true, useUnifiedTopology: true})
.then( () => console.log('connected to mongoDb'))
.catch( () => console.log('cant connect to mongoDb'));

app.set('view engine','pug');
app.set('views','./views');
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/static',static);
app.use('/book',book);
app.use('/Admin',admin);

app.get('/', (req,res) =>{
    res.sendFile(__dirname + '/first-page.html');
});
const port = process.env.PORT || 3000;
app.listen( port, () => console.log(`Listening on port ${port}`));