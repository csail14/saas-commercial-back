
const jwt = require('jsonwebtoken');
if(!process.env.HOST_DB) {
	var config = require('../config')
}else {
	var config = require('../config-exemple')
}
let secret = process.env.TOKEN_SECRET || config.token.secret;
const withAuth = require('../withAuth');


module.exports = (app, db)=>{
    const followModel = require('../models/followModel')(db);

    app.post('/api/v1/follow/add/:user_id/:prospect_id',withAuth, async (req,  res, next)=>{
    	let result = await followModel.saveOneFollow(req, req.params.user_id, req.params.prospect_id);
       
    	if(result.code) {
            console.log(result)
    		res.json({status: 500, err: result})
    	}

    	if(result.status === 501 ) {
            console.log(result)
    		res.json(result)    	
        }
    	res.json({status: 200, msg: "follow enregistré", follow: result})
    })

    app.get('/api/v1/follow/get/all/:user_id',withAuth, async (req,res,next)=>{
        let result = await followModel.getAllFollow(req, req.params.user_id);
        if(result.code) {
            console.log(result)
            res.json({status:500, err:result})
        }
        if(result.status===501){
            console.log(result)
            res.json(result)
        }
        res.json({status:200, follow:result})
    })
    app.get('/api/v1/follow/get/:user_id/:follow_id', async (req,res,next)=>{
        let result = await followModel.getFollowById(req, req.params.user_id, req.params.follow_id);
        if(result.code) {
            console.log(result)
            res.json({status:500, err:result})
        }
        if(result.status===501){
            console.log(result)
            res.json(result)
        }
        res.json({status:200, follow:result})
    })

    app.delete('/api/v1/follow/delete/:user_id/:follow_id',withAuth, async (req,res,next)=>{
        let result = await followModel.deleteFollowById(req, req.params.user_id, req.params.follow_id);
        if(result.code) {
            console.log(result)
            res.json({status:500, err:result})
        }
        if(result.status===501){
            console.log(result)
            res.json(result)
        }
        res.json({status:200, follow:result})
    })

    app.put('/api/v1/follow/set/:user_id/:follow_id',withAuth, async (req,res,next)=>{
        let result = await followModel.setFollowById(req, req.params.user_id, req.params.follow_id);
        if(result.code) {
            console.log(result)
            res.json({status:500, err:result})
        }
        if(result.status===501){
            console.log(result)
            res.json(result)
        }
        res.json({status:200, follow:result})
    })


}