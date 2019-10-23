const express = require('express');
const router = express.Router();

router.post('/', (req,res) =>{
    console.log(req.isAuthenticated());

    if(req.isAuthenticated()) return res.status(200).send();
    
    res.status(400).send()
});


module.exports = router;