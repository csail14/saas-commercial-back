 
module.exports = (_db)=>{
    db = _db;
    return FollowModel;
}

class FollowModel {
    
	static async saveOneFollow(req,user_id,prospect_id){
		return db.query('INSERT INTO follows (prospect_id, user_id, creationTimestamp, callDateTime, type, description) VALUES(?, ?, NOW(), ?, ?, ?)', [prospect_id, user_id, req.body.callDateTime, req.body.type, req.body.description])
		.then((result)=>{
			return result
		})
		.catch((err)=>{
			return err
		})
    }
    
    static async getAllFollow(req, user_id,prospect_id){
		return db.query('SELECT * FROM follows WHERE user_id=? ORDER BY callDateTime', [user_id, prospect_id])
		.then((result)=>{
			return result
		})
		.catch((err)=>{
			return err
		})
    }
    
    static async getFollowById(req, user_id, follow_id){
		return db.query('SELECT * FROM follows WHERE (user_id=? AND id=?)', [user_id, prospect_id, follow_id])
		.then((result)=>{
			return result
		})
		.catch((err)=>{
			return err
		})
    }
    
    static async deleteFollowById(req, user_id, follow_id){
		return db.query('DELETE FROM follows WHERE user_id=? AND id=?', [user_id, follow_id])
		.then((result)=>{
			return result
		})
		.catch((err)=>{
			return err
		})
    }
    
    static async setFollowById(req, user_id, follow_id){
		return db.query('UPDATE follows SET callDateTime=?,type=?,description=? WHERE user_id=? AND id=?', [req.body.callDateTime, req.body.type,req.body.description, user_id, follow_id])
		.then((result)=>{
			return result
		})
		.catch((err)=>{
			console.log('ok', result)
			return err
		})
	}


}