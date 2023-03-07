require("dotenv/config");
const express = require("express");
const cors = require("cors");
const { join } = require("path");

const PORT = process.env.PORT || 8000;
const app = express();
app.use(cors(
  {
    origin: "http://localhost:3000",
  }
));

app.use(express.json());

//#region API ROUTES
const {adminRouter, productsRouter, usersRouter, transactionRouter} = require('./routers');
app.use('/admin', adminRouter);
app.use('/products', productsRouter);
app.use('/users', usersRouter);
app.use('/transaction', transactionRouter);

// NOTE : Add your routes here

app.get("/api", (req, res) => {
  res.send(`Hello, this is my API`);
});

app.get("/api/greetings", (req, res, next) => {
  res.status(200).json({
    message: "Hello, Student !",
  });
});

// ===========================

// not found
app.use((req, res, next) => {
  if (req.path.includes("/api/")) {
    res.status(404).send("Not found !");
  } else {
    next();
  }
});

// error
app.use((err, req, res, next) => {
  if (req.path.includes("/api/")) {
    console.error("Error : ", err.stack);
    res.status(500).send("Error !");
  } else {
    next();
  }
});

//#endregion

//#region CLIENT
const clientPath = "../../client/build";
app.use(express.static(join(__dirname, clientPath)));

// Serve the HTML page
app.get("*", (req, res) => {
  res.sendFile(join(__dirname, clientPath, "index.html"));
});

//#endregion

app.listen(PORT, (err) => {
  if (err) {
    console.log(`ERROR: ${err}`);
  } else {
    console.log(`APP RUNNING at ${PORT} ✅`);
  }
});

// sequelize synchronous
// const Sequelize = require('sequelize')
// const Models = require('./models')

// Models.sequelize.sync({
//     force: false,
//     alter: true,
//     logging: console.log
// }).then(function () {
//     console.log('database is synchronized')
// }).catch(function (error){
//     console.log(error, 'something went wrong with the database')
// })
// Models.sequelize.sync({
//     force: false,
//     alter: true,
//     logging: console.log
// }).then(function () {
//     console.log('database is synchronized')
// }).catch(function (error){
//     console.log(error, 'something went wrong with the database')
// })