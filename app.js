// nodemon app.js  -> (terminal) automatically restart the server when we make the change
// npm run server -> will run and go to url below.
// http://127.0.0.1:4000/

// older way to import modules
// const express = require("express");
import session from "express-session";
import express from "express";
import HelloRoutes from "./hello.js";
import Lab5 from "./lab5.js";
import cors from "cors";
import CourseRoutes from "./courses/routes.js";
import ModuleRoutes from "./modules/routes.js";
import AssignmentRoute from "./assignment/routes.js";
import UserRoutes from "./users/routes.js";
import mongoose from "mongoose";
import "dotenv/config";

// npm run server
// connect to the database (localhost needs to be api address)
mongoose.connect("mongodb://127.0.0.1:27017/Kanbas");
//creating an instance of express to the library.
const app = express();
app.use(
  cors({
    credentials: true, // cookie
    origin: process.env.FRONTEND_URL,
  })
); // allow react to connect to server. and only allow 3000 to be called.

const sessionOptions = {
  secret: "any string",
  resave: false,
  saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
  };
}

app.use(session(sessionOptions));

app.use(express.json()); // this is json parsing so the body knows what is passing in.

UserRoutes(app);
ModuleRoutes(app);
CourseRoutes(app);
HelloRoutes(app);
AssignmentRoute(app);
Lab5(app);

console.log("STARTED the Server.....");

// listening to the port 4000 since 3000 is used by react client
app.listen(4000);
// app.listen(process.env.port || 4000);
