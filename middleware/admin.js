
module.exports = function(req,res,next){
   console.log("user object " + req.user);
	console.log("is admin value "+ req.user.isAdmin);

	if(!req.user.isAdmin) return res.status(403).send('Access Denied !');
	next();
}