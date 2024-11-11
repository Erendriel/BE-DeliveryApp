const express = require("express");

const app = express();
const http = require("http");
const server = http.createServer(app);
const logger = require("morgan");
const cors = require("cors");
const passport = require("passport");

/*
IMPORT ROUTES
*/

const usersRoutes = require("./routes/userRoutes");

const port = process.env.PORT || 3000;
app.use(logger("dev"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());

require("./config/passport")(passport);

app.disable("x-powered-by");

app.set("port", port);
usersRoutes(app);

server.listen(3000, "192.168.101.100" || "localhost", function () {
  console.log("NodeJS App " + process.pid + " Init...");
});

app.get("/", (req, res) => {
  res.send("Ruta raiz del backend");
});
app.get("/test", (req, res) => {
  res.send("Test");
});

// Error handler

app.use((error, req, res, next) => {
  console.log(error);
  res.status(error.status || 500).send(error.stack);
});
