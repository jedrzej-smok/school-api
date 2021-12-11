function checkAuth(routeRole){
    return function (req, res, next){
        const userRole = req.cookies['role'];
        if(userRole === null||userRole===''){
            res.cookie("role", "guest");
        }


        if(userRole !== routeRole){
            res.status(401);
            res.send({
                message: 'Brak dostępu',
            });
            return;
        } else {
            console.log('AUTH');
            next();
        }
    }
}
module.exports={
    checkAuth
}