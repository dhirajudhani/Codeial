// we will find the request of flash and store its response in the locals
module.exports.setFlash = function(req,res,next){
    res.locals.flash = {
        'success':req.flash('success'),
        'error':req.flash('error')
    }
    next();
}