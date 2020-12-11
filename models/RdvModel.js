 
module.exports = (_db)=>{
    db = _db;
    return RdvModel;
}

class RdvModel {
    
	static async saveOneRdv(req){
		return db.query('INSERT INTO rdv (name, startDateTime, endDateTime, classes, user_id, _id) VALUES(?, ?, ?, ?, ?, ?)', [req.body.name, req.body.startDateTime, req.body.endDateTime, req.body.classes, req.body.user_id, req.body._id])
		.then((result)=>{
			return result
		})
		.catch((err)=>{
			return err
		})
    }
    
    static async getAllRdv(req, user_id){
		return db.query('SELECT * FROM rdv WHERE user_id=? ORDER BY startDateTime', [user_id])
		.then((result)=>{
			return result
		})
		.catch((err)=>{
			return err
		})
    }
    
    static async getRdvById(req, user_id, _id){
		return db.query('SELECT * FROM rdv WHERE user_id=? AND _id=?', [user_id, _id])
		.then((result)=>{
			return result
		})
		.catch((err)=>{
			return err
		})
    }
    
    static async deleteRdvById(req, user_id, _id){
		return db.query('DELETE FROM rdv WHERE user_id=? AND _id=?', [user_id, _id])
		.then((result)=>{
			return result
		})
		.catch((err)=>{
			return err
		})
    }
    
    static async setRdvById(req, user_id, _id){
		return db.query('UPDATE rdv SET name=?, startDateTime=?, endDateTime=?,classes=? WHERE user_id=? AND _id=?', [req.body.name, req.body.startDateTime,req.body.endDateTime,req.body.classes,user_id, _id])
		.then((result)=>{
			return result
		})
		.catch((err)=>{
			return err
		})
	}


}