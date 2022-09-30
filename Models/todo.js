// import mongos package 
const mongodb = require('mongoose');




// import schema handler :
const Schema = mongodb.Schema;



// create new schema : 

const TodoSchema = new Schema({
	/* the structur of an todo object  */
		Title:{
			type:String,
			required:true
		},
		Description:{
			type:String,
			required:true	
		},
		State:{
			type:String,
			required:true
		}
	},
	{
		/* generate a time create automaticly for us*/
		timestamps:true
	}
);

// now after setup the schema we should seting up a modal 
// modal is an interface to interact with a specific schema : 

const Todo = mongodb.model("Todo",TodoSchema);

// the last step is to export the Todo model : 

module.exports = Todo;