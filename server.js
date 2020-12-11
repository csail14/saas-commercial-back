const express = require('express');
const app = express();
const bodyParser = require('body-parser');

if(!process.env.HOST_DB) {
	var config = require('./config')
}else {
	var config = require('./config-exemple')
}


app.use(express.static(__dirname + '/public'));
app.set('views', './views');
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


const cors = require('cors');
app.use(cors());

const mysql = require('promise-mysql');

const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const comRoutes = require('./routes/comRoutes');
const rdvRoutes = require('./routes/rdvRoutes');
const prospectRoutes = require('./routes/prospectRoute');
const followRoutes = require('./routes/followRoute');

const host = process.env.HOST_DB || config.db.host;
const database = process.env.DATABASE_DB || config.db.database;
const user = process.env.USER_DB || config.db.user;
const password = process.env.PASSWORD_DB || config.db.password;
const port = process.env.PORT_DB || config.db.port;

mysql.createConnection({
	host: host,
	database: database,
	user: user,
    password: password,
    port:port
})
.then((db) => {
    console.log('connecté à la bdd');
    setInterval(async function () {
		let res = await db.query('SELECT 1');
	}, 10000);
	
	app.get('/', (req, res, next)=>{
	    res.json({status: 200, msg: "welcome to my api babypub"})
	})
	
    userRoutes(app, db);
	authRoutes(app, db)
    comRoutes(app, db)
    rdvRoutes(app, db)
	prospectRoutes(app,db);
	followRoutes(app,db);
})
.catch((err)=>{
    console.log(err);
})




const PORT = process.env.PORT || 8000;
app.listen(PORT, ()=>{
	console.log('listening port '+PORT+' all is ok');
})