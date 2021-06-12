import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import indexRouter from "./routes/index.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());
app.use("/", indexRouter);

mongoose
  .connect("mongodb+srv://admin:admin@jobchat0.mqguj.mongodb.net/jobchatDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("connected to the database...");
    app.listen(5000, () => {
      console.log("server started, listening on port 5000...");
    });
  })
  .catch((e) => {
    console.log("failed to connect to database", e);
  });
