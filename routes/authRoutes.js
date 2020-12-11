const withAuth = require('../withAuth');


module.exports = (app, db)=>{
    const userModel = require('../models/UserModel')(db);

   app.get('/api/v1/checkToken', withAuth, async (req, res, next)=>{
        //console.log(req)
        let user = await userModel.getUserByMail(req.email); 
        
        res.json({status: 200, msg: "token valide ", user: user})
    })

}