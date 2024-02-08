const {request, response} = require("express");
const express = require("express");
const app = express();
const { Op } = require("sequelize");
const Sequelize = require('sequelize')

app.use(express.json());

const models = require("../models/index");

const member = models.member;
const pinjaman = models.pinjaman;
const book = models.book;

app.post("/addMember", async(request, response)=>{
    try {

        let newMember = {
            code: request.body.code,
            name: request.body.name,
            penality_status: request.body.penalty_status,
        };

        await member.create(newMember);

        return response.json({
            message: "Data Member berhasil ditambahkan!",
        });

    } catch (e) {
        return response.status(400).json({
            error: e.message,
        });
    }
})

app.get("/getAllMember", async(request, response)=>{
    try {
        const data = await member.findAll({
            attributes:["code", "name"],
        })
    
        return response.json({
            message: "list All Member",
            Data: data
        });
    } catch (e) {
        return response.status(400).json({
            error: e.message,
        });
    }
})

app.get("/getMember", async (request, response) => {
    try {
        const allMembers = await member.findAll();

        const membersWithBorrowedBooks = [];
    
        // Loop melalui setiap anggota
        for (const member of allMembers) {

          const borrowedBooksCount = await pinjaman.count({ where: { id_member: member.id_member, is_returned: false } });
          
          membersWithBorrowedBooks.push({
            code: member.code,
            name: member.name,
            borrowed_books_count: borrowedBooksCount
          });
        }
  
      return response.json({
        message: "List Existing member dan Buku dipinjam",
        Data: membersWithBorrowedBooks
      });
    } catch (e) {
      return response.status(400).json({
        error: e.message,
      });
    }
});  



module.exports = app;