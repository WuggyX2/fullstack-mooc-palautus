const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const blogsRouter = require("./controllers/blogs");
const userRouter = require("./controllers/users");
const config = require("./utils/config");
const middleware = require("./utils/middleware");
const logger = require("./utils/logger");

mongoose
    .connect(config.MONGODB_URI)
    .then(() => {
        console.log("Connected to MongoDB");
        //logger.info("connected to MongoDB");
    })
    .catch((error) => {
        logger.error("error connection to MongoDB:", error.message);
    });

app.use(cors());
app.use(express.json());
app.use("/api/users", userRouter);
app.use("/api/blogs", blogsRouter);

app.use(middleware.errorHandler);

module.exports = app;
