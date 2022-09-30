// import env module : 
let dotenv = require('dotenv').config();


// get the url connexion to mongodb from .env file :
const url = process.env.DB_URI;

//import mongodb module : mongose :
const mongodb = require('mongoose');


const makeConnexion = ()=>{
	// make connexion to mongodb : 
	mongodb.connect(url)
	.then((response)=>{
		// connecion success :
		console.log("connected to mongodb ");
	})
	.catch((error)=>{
		console.error(" connexion error ", error);
	});
}

module.exports ={ makeConnexion };