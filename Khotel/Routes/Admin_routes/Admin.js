const {createRoom,allRooms,updateRoom,deleteRoom,reservedRooms,unreserveRoom}= require('../../models/rooms');
const auth = require('../../middlewares/auth');
const express = require('express');
const router = express.Router();

router.get('/', auth,(req,res) =>{
    res.sendFile(__dirname + '/Admin.html');
})

router.get('/modify', auth,async(req,res) =>{
    let allrooms = await allRooms();
    res.render('allRooms',{ allrooms}); 
});

router.put('/update_room', async (req,res) =>{
   try{ 
   let response = await updateRoom(
       req.body.roomNumber,
       req.body.kind,
       req.body.specials,
       req.body.price)
   res.send(response);
   }catch(e){res.status(400).send(e.message)}      
});

router.post('/createRoom', async(req,res) =>{
  try{
    let response = await createRoom(
        req.body.roomNumber,
        req.body.kind,
        req.body.specials,
        req.body.price); 
    res.send(response);
   }catch(e){res.status(400).send(e.message)} 
});

router.delete('/deleteRoom', async(req,res) =>{
  try{ 
    let response = await deleteRoom(req.body.roomNumber);
    res.send(response);
   }catch(e){res.status(400).send(e.message)} 
});

router.get('/reserved',auth,(req,res) =>{
   res.render('Reserved');
});

router.post('/list_reserved', async(req,res) =>{
   let response = await reservedRooms(
       req.body.check_in,
       req.body.check_out);
   res.send(response);    
});

router.put('/unreserve', async(req,res)=>{
   let response = await unreserveRoom(
       req.body.roomNumber,
       req.body.from,
       req.body.to)
   res.send(response);     
});


module.exports = router;