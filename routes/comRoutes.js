const withAuth = require('../withAuth');
const mail = require('../lib/mailing');

module.exports = (app, db)=>{
    const userModel = require('../models/UserModel')(db);

   app.get('/api/v1/sendMail',withAuth, async (req, res, next)=>{
        mail('cssaillard@gmail.com', 'test mail', 'coucou', 'ceci est un test d\'envoi de mail');
        res.json({msg: 'envoi mail'})
    })

}