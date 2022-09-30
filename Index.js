// import express 
const express = require('express');

const   { makeConnexion } = require('./mongodbHandler');

const Todo = require("./Models/todo");

// import morgan middelware : 

const morgan = require('morgan');
// use express to create new instance:
const server = express();

// use the server : 

server.listen(3000);
/*
	a middleware is a function fired betwenn send request and get response 
*/
// fire a middleware handler : 

server.use(morgan('tiny'));
server.use(express.urlencoded({'extended':true}));
server.use(express.json({ limit: "10mb" }));
// teste an get request : 

server.get("/",(req,res)=>{
	console.log(" server request get method :) ");
	res.send(
		{
			"Name":"salah",
			"Password": "N133188452"
		});
	// to render html file : 
	/* res.sendFile(" relative path of file ",
					js object root : 
					{
						root: __dirname
					}
					)*/
	// to redirect to other router : 
	/*
	res.redirect("router");
	*/
	// handel router error : 
	/*
	app.use(
		(req,res)=>{
			set error status : res.status() return response object
			res.status(404).senFile(url_file,root_object);
		};
	);
	*/
	console.log("response is sended ");
});

// get todos from mongodb : 

server.get("/Todos",(req,res)=>{
	makeConnexion();
	// fetch mongodb collection to find all todos : 
	Todo.find()
	.then(response => {
		res.send(response);
	})
	.catch(error => {
		res.send(
			{ 
				state : "error",
			 	message:" cann not fetch data "
			}
		);
	});
});

server.get("/Todos/:name", (req, res)=>{
	var todo_name = req.params.name;
	// make connexion to the mongodb : 
	makeConnexion();
	// find the target if is exist : 
	Todo.find({
		// query fillter : 
		Title:todo_name
	})
	.then(response => {
		// check if response is not null :
		if (response.length === 0){
			res.send({
				state : "error",
				message:" No document found  "		
			});	
		}else{
			res.send(response);	
		}
	})
	.catch( error => {
		res.send({
			state : "error",
			message:" cann not fetch data "		
		});
	});
});

server.post("/AddTodos", (req,res) =>{
	// set a ne blog from req body :
	makeConnexion(); 
	console.log(req.body);
	// genrate a new Todo : 
	const toinsert = new Todo({
		Title:req.body.Title,
		Description:req.body.Description,
		State:req.body.State
	});
	// insert todo to data base : 
	toinsert.save()
	.then(response=>{
		res.send(response);
	})
	.catch(error => {
		res.send(error);
	});
})

server.delete("/RmoveTodos/:name", (req,res) =>{
	makeConnexion();
	let targetname = req.params.name;
	// delete the target item if exist : 
	Todo.deleteOne({
		// filter : 
		Title:targetname
	})
	.then( response => {
		res.send(response);
	})
	.catch( error => {
		res.send(error);
	});
});