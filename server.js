const express = require("express");
require("dotenv").config();

const app = express();

//SWAGGER
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const books = require("./routers/books")
app.use("/api",books)

const members = require("./routers/members")
app.use("/api",members)

const pinjam = require("./routers/pinjam")
app.use("/api",pinjam)

app.listen(process.env.PORT, ()=>{
    console.log(`Server run on port ${process.env.PORT}`);
})