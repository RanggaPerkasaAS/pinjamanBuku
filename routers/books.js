const {request, response} = require("express");
const express = require("express");
const app = express();
const { Op } = require("sequelize");

app.use(express.json());

const models = require("../models/index");

const book = models.book;

app.post("/addBook", async(request, response)=>{
    try {

        let newBook = {
            code: request.body.code,
            title: request.body.title,
            author: request.body.author,
            stock: request.body.stock,
        };

        await book.create(newBook);

        return response.json({
            message: "Data buku berhasil ditambahkan!",
        });

    } catch (e) {
        return response.status(400).json({
            error: e.message,
        });
    }
})

app.get("/getExistBook", async(request, response)=>{
    try {
        const data = await book.findAll({
            attributes:["code", "title", "author", "stock"],
            where :{
                stock:{
                    [Op.gt]: 0
                }
            }
        })
    
        return response.json({
            message: "list Exsiting Buku",
            Data: data
        });
    } catch (e) {
        return response.status(400).json({
            error: e.message,
        });
    }
})

app.get("/getAllBook", async(request, response)=>{
    try {
        const data = await book.findAll({
            attributes:["code", "title", "author", "stock"],
        })
    
        return response.json({
            message: "list All Buku",
            Data: data
        });
    } catch (e) {
        return response.status(400).json({
            error: e.message,
        });
    }
})

module.exports = app;