const express = require('express');
const router = express.Router();

router.get('/door.jpg', (req,res) =>{
    res.sendFile(__dirname + '/door.jpg')
});

router.get('/hotel.jpg', (req,res) =>{
    res.sendFile(__dirname + '/hotel.jpg');
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

module.exports = router;