import http from "http";
import express from "express";
import { Server } from "socket.io";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import indexRouter from "./routes/index.js";

try {
  await mongoose.connect(
    "mongodb+srv://admin:admin@jobchat0.mqguj.mongodb.net/jobchatDB",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    }
  );
  console.log("connected to the database...");
} catch (err) {
  console.log("error connecting to database!");
}

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());
app.use("/", indexRouter);

const server = http.createServer(app);
const io = new Server(server);

server.listen(5000, () => {
  console.log("listening on *:5000");
});

// mongoose
//   .connect("mongodb+srv://admin:admin@jobchat0.mqguj.mongodb.net/jobchatDB", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useFindAndModify: false,
//   })
//   .then(() => {
//     console.log("connected to the database...");
//     app.listen(5000, () => {
//       console.log("server started, listening on port 5000...");
//     });
//   })
//   .catch((e) => {
//     console.log("failed to connect to database", e);
//   });
