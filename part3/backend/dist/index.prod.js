"use strict";require("dotenv").config();var express=require("express"),app=express(),cors=require("cors"),Note=require("./models/note"),mongoose=require("mongoose");app.use(cors()),app.use(express.static("build")),app.use(express.json()),app.get("/",function(e,n){n.send("<h1>Hello world!</h1>")}),app.get("/api/notes",function(e,n){var t;return regeneratorRuntime.async(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,regeneratorRuntime.awrap(Note.find({}));case 2:t=e.sent,console.log(t),n.json(t);case 5:case"end":return e.stop()}})}),app.get("/api/notes/:id",function(e,n){Note.findById(e.params.id).then(function(e){n.json(e)})}),app.post("/api/notes",function(e,n){var t=e.body;if(void 0===t.content)return n.status(400).json({error:"content missing"});new Note({content:t.content,important:t.important||!1,date:new Date}).save().then(function(e){n.json(e)})}),app.delete("/api/notes/:id",function(e,n){var t=Number(e.params.id);notes=notes.filter(function(e){return e.id!==t}),n.status(204).end()});var PORT=process.env.PORT||3001;app.listen(PORT,function(){console.log("Server running on port ".concat(PORT))});