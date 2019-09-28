const express = require('express');
const router = express.Router();
const {getRooms,reserveRoom} = require('../../models/rooms');

let check_in;
let check_out;
router.post('/search', async(req,res) =>{
    check_in = req.body.check_in;
    check_out = req.body.check_out;
    let response = await getRooms(
    req.body.check_in,
    req.body.check_out,
    req.body.options);
    if(response.length ==0) return res.render('noRooms');
    res.render('second-page',{ rooms_list:response});
});

router.post('/reserve',async(req,res) =>{
    let response = await reserveRoom(req.body.roomNum,check_in,check_out);
    res.send(response);
});

module.exports = router;