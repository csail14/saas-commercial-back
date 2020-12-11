 
module.exports = (_db)=>{
    db = _db;
    return ProspectModel;
}

class ProspectModel {
    
	static async saveOneProspect(req, user_id){
		return db.query('INSERT INTO prospect (firstName, lastName, company, address, zip, city, status, email, phone, creationTimestamp, description, user_id) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?,NOW(), ?, ?)', [req.body.firstName, req.body.lastName, req.body.company, req.body.address, req.body.zip, req.body.city, req.body.status, req.body.email,req.body.phone,req.body.description, user_id])
		.then((result)=>{
			return result
		})
		.catch((err)=>{
			return err
		})
    }
    
    static async getAllProspect(req, user_id){
		return db.query('SELECT * FROM prospect WHERE user_id=? ORDER BY lastName', [user_id])
		.then((result)=>{
			return result
		})
		.catch((err)=>{
			return err
		})
    }
    
    static async getProspectById(req, user_id, prospect_id){
		return db.query('SELECT * FROM prospect WHERE user_id=? AND id=?', [user_id, prospect_id])
		.then((result)=>{
			return result
		})
		.catch((err)=>{
			return err
		})
    }
    
    static async deleteProspectById(req, user_id, prospect_id){
		return db.query('DELETE FROM prospect WHERE user_id=? AND id=?', [user_id, prospect_id])
		.then((result)=>{
			return result
		})
		.catch((err)=>{
			return err
		})
    }
    
    static async setProspectById(req, user_id, prospect_id){
		return db.query('UPDATE prospect SET firstName=?,lastName=?,company=?,address=?,zip=?,city=?,status=?,email=?,phone=?,description=? WHERE user_id=? AND id=?', [req.body.firstName, req.body.lastName,req.body.company,req.body.address, req.body.zip, req.body.city, req.body.status, req.body.email, req.body.phone,req.body.description,user_id, prospect_id])
		.then((result)=>{
			return result
		})
		.catch((err)=>{
			return err
		})
	}


}