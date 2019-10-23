const express = require('express');
const router = express.Router();

router.get('/favicon.ico',(req,res) =>{
    res.sendFile(__dirname + '/favicon.ico')
});

router.get('/door.jpg', (req,res) =>{
    res.sendFile(__dirname + '/door.jpg')
});

router.get('/bed-image.jpg', (req,res) =>{
    res.sendFile(__dirname + '/bed-image.jpg');
});

router.get('/hotel-im1.jpg', (req,res) =>{
    res.sendFile(__dirname + '/hotel-im1.jpg');
});

router.get('/hotel-im2.jpg', (req,res) =>{
    res.sendFile(__dirname + '/hotel-im2.jpg');
});

router.get('/hotel-im3.jpg', (req,res) =>{
    res.sendFile(__dirname + '/hotel-im3.jpg');
});

router.get('/bedIco.png', (req,res) =>{
    res.sendFile(__dirname + '/bedIco.png');
});

router.get('/hotel1.jpg', (req,res) =>{
   res.sendFile(__dirname + '/hotel1.jpg');
});

router.get('/second-page.js', (req,res) =>{
    res.sendFile(__dirname + '/second-page.js')
});

router.get('/allRooms.js', (req,res) =>{
   res.sendFile(__dirname + '/allRooms.js');
});

router.get('/reservedRooms.js', (req,res) =>{
    res.sendFile(__dirname + '/reservedRooms.js')
});

router.get('/fetchumd',(req,res) =>{
    res.sendFile(__dirname + '/fetch.umd.js');
})
module.exports = router;