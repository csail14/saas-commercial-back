
const jwt = require('jsonwebtoken');
if(!process.env.HOST_DB) {
	var config = require('../config')
}else {
	var config = require('../config-exemple')
}
let secret = process.env.TOKEN_SECRET || config.token.secret;
const withAuth = require('../withAuth');
const mail = require('../lib/mailing');


module.exports = (app, db)=>{
    const rdvModel = require('../models/RdvModel')(db);

    app.post('/api/v1/rdv/add/:user_id', withAuth, async (req,  res, next)=>{
    	let result = await rdvModel.saveOneRdv(req, req.params.user_id);
    	if(result.code) {
            console.log(result)
    		res.json({status: 500, err: result})
    	}

    	if(result.status === 501 ) {
            console.log(result)
    		res.json(result)    	
        }
    	res.json({status: 200, msg: "rdv enregistré", result: result})
    })

    app.get('/api/v1/rdv/get/all/:user_id', async (req,res,next)=>{
        let result = await rdvModel.getAllRdv(req, req.params.user_id);
        
        if(result.code) {
            console.log(result)
            res.json({status:500, err:result})
        }
        if(result.status===501){
            console.log(result)
            res.json(result)
        }
        res.json({status:200, result:result})
    })
    app.get('/api/v1/rdv/get/:user_id/:rdv_id', async (req,res,next)=>{
        let result = await rdvModel.getRdvById(req, req.params.user_id, req.params.rdv_id);
        
        if(result.code) {
            console.log(result)
            res.json({status:500, err:result})
        }
        if(result.status===501){
            console.log(result)
            res.json(result)
        }
        res.json({status:200, result:result})
    })

    app.delete('/api/v1/rdv/delete/:user_id/:rdv_id', async (req,res,next)=>{
        let result = await rdvModel.deleteRdvById(req, req.params.user_id, req.params.rdv_id);
       
        if(result.code) {
            console.log(result)
            res.json({status:500, err:result})
            
        }
        if(result.status===501){
            console.log(result)
            res.json(result)

        }
        res.json({status:200, result:result})
    })

    app.put('/api/v1/rdv/set/:user_id/:_id', async (req,res,next)=>{
        let result = await rdvModel.setRdvById(req, req.params.user_id, req.params._id);
       
        if(result.code) {
            console.log(result)
            res.json({status:500, err:result})
        }
        if(result.status===501){
            console.log(result)
            res.json(result)
        }
        res.json({status:200, result:result})
    })

    





}