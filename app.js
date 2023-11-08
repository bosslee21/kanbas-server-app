// nodemon app.js  -> (terminal) automatically restart the server when we make the change
// npm run server -> will run and go to url below. 
// http://127.0.0.1:4000/   

// older way to import modules
// const express = require("express");
import express from "express";
import HelloRoutes from "./hello.js";
import Lab5 from "./lab5.js";
import cors from "cors";
import CourseRoutes from "./courses/routes.js";
//creating an instance of express to the library. 
const app = express();
app.use(cors({
    origin: "http://localhost:3000",
})); // allow react to connect to server. and only allow 3000 to be called. 
app.use(express.json()); // this is json parsing so the body knows what is passing in.
CourseRoutes(app);
HelloRoutes(app);
Lab5(app);



// listening to the port 4000 since 3000 is used by react client
app.listen(4000);

