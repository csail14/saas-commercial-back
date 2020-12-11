const jwt = require('jsonwebtoken');
if(!process.env.HOST_DB) {
	var config = require('./config')
}else {
	var config = require('./config-exemple')
}
const secret = process.env.TOKEN_SECRET || config.token.secret;


const withAuth = (req, res, next)=>{
    
    const token = req.headers['x-access-token'];
    
    
    jwt.verify(token, secret, (err, decode)=>{
        
        
        if(err) {
          console.log(err);
          res.json({status: 401, err: err})
        } else {
            req.id = decode.id;
            req.email = decode.email;
            next();
        }
    })
    
    
}

module.exports = withAuth;