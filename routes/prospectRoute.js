
const jwt = require('jsonwebtoken');
if(!process.env.HOST_DB) {
	var config = require('../config')
}else {
	var config = require('../config-exemple')
}
let secret = process.env.TOKEN_SECRET || config.token.secret;
const withAuth = require('../withAuth');


module.exports = (app, db)=>{
    const prospectModel = require('../models/prospectModel')(db);

    app.post('/api/v1/prospect/add/:user_id',withAuth, async (req,  res, next)=>{
        let result = await prospectModel.saveOneProspect(req, req.params.user_id);
    	if(result.code) {
            console.log(result)
    		res.json({status: 500, err: result})
    	}

    	if(result.status === 501 ) {
            console.log(result)
    		res.json(result)    	
        }
    	res.json({status: 200, msg: "prospect enregistré", result: result})
    })

    app.get('/api/v1/prospect/get/all/:user_id',withAuth, async (req,res,next)=>{
        let result = await prospectModel.getAllProspect(req, req.params.user_id);
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
    app.get('/api/v1/prospect/get/:user_id/:prospect_id',withAuth, async (req,res,next)=>{
        let result = await prospectModel.getProspectById(req, req.params.user_id, req.params.prospect_id);
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

    app.delete('/api/v1/prospect/delete/:user_id/:prospect_id',withAuth, async (req,res,next)=>{
        let result = await prospectModel.deleteProspectById(req, req.params.user_id, req.params.prospect_id);
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

    app.put('/api/v1/prospect/set/:user_id/:prospect_id',withAuth, async (req,res,next)=>{
        let result = await prospectModel.setProspectById(req, req.params.user_id, req.params.prospect_id);
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