module.exports = function(req,res,next){
    if(req.isAuthenticated()) return next()

    res.send(`ACCESS DENIED:: for Admins only!`);
};