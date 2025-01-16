import express from "express";
import userRouter from "./routes/user.route.js";
import postRouter from "./routes/post.route.js";
import commentRouter from "./routes/comment.route.js";
import authRouter from "./routes/auth.route.js";
import connectDB from "./lib/connectDB.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

// app.use(cors(process.env.CLIENT_URL, { credentials: true }));
// app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cors({ origin: `${process.env.CLIENT_URL}`, credentials: true }));
app.use(express.json());
app.use(cookieParser());

// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/posts", postRouter);
app.use("/comments", commentRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("An error occurred");
});

app.listen(3000, () => {
  connectDB();
  console.log("Server is running on port 3000");
});
