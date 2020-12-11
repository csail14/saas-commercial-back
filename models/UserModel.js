const bcrypt = require('bcrypt');
const saltRounds = 10;

var randomId = require('random-id');
var len = 20;
var pattern = 'aA0'
 
module.exports = (_db)=>{
    db = _db;
    return UserModel;
}

class UserModel {
    
	static async saveOneUser(req){
		let hash = await bcrypt.hash(req.body.password, saltRounds);

        let user = await db.query('SELECT * FROM users WHERE email = ?', [req.body.email]);
        
        let key_id = randomId(len, pattern);

		if(user.length > 0) {
			return {status: 501, msg: "email déjà utilisé"}
		}

		return db.query('INSERT INTO users (firstName, lastName, email, password, role, creationTimestamp, validate, keyId) VALUES(?, ?, ?, ?, ?, NOW(), "no", ?)', [req.body.firstName, req.body.lastName, req.body.email, hash, req.body.role, key_id])
		.then((result)=>{
            result.key_id = key_id;
			return result
		})
		.catch((err)=>{
			return err
		})
	}

	static async getUserByMail(email){
		let user = await db.query('SELECT * FROM users WHERE email = ?', [email]);

		return user;
    }
    
    static async updateValidateUser(key_id){
		let user = await db.query('UPDATE users SET validate = "yes" WHERE keyId = ?', [key_id]);

		return user;
    }
    
    static async updateKeyId(email){
		let key_id = randomId(len, pattern);
		
		let user = await db.query('UPDATE users SET keyId = ? WHERE email = ?', [key_id, email]);
		
		let result = {key_id: key_id, user: user}

		return result;
    }
    
    static async updatepassword(newPassword, key_id){
		let hash = await bcrypt.hash(newPassword, saltRounds);
		
		let result = await db.query('UPDATE users SET password = ? WHERE keyId = ?', [hash, key_id]);
        return result;
    }
		

}