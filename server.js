const express = require("express");
const app = express();
const mongoose = require("mongoose");

const handleError = require("./middlewares/error.middleware");

// Routes
const authRoute = require("./routes/auth.route");
const userRoute = require("./routes/users.routes");
const postRoute = require("./routes/posts.route");
const categoryRoute = require("./routes/categories.route");
const commentRoute = require("./routes/comments.route");

require("dotenv").config();

let uri = process.env.MONGO_URL;
uri = uri
  .replace("<username>", process.env.MONGO_USERNAME)
  .replace("<password>", process.env.MONGO_PASSWORD);

const port = process.env.PORT || port;

app.use(express.json());

app.use(require("./middlewares/logger.middleware"));

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/categories", categoryRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/posts", postRoute);
app.use("/api/v1/comments", commentRoute);

app.use(handleError);

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log("Database Connected Successfully"))
  .catch((err) => console.error(err));
app.listen(port, () => console.log(`listening on http://localhost:${port}`));
