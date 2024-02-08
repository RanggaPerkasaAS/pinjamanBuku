const {request, response} = require("express");
const express = require("express");
const app = express();

app.use(express.json());

const models = require("../models/index");

const member = models.member;
const pinjaman = models.pinjaman;
const book = models.book;

app.post("/pinjam/:id_member", async(request, response)=>{
    try {
        const id_member = request.params.id_member;

        const memberInfo = await member.findByPk(id_member);
        if (memberInfo.penalty_status) {
            return response.status(400).json({ error: "Anggota sedang dikenai denda. Tidak dapat meminjam buku." });
        }

        const borrowedBooksCount = await pinjaman.count({ where: { id_member: id_member, is_returned: false } });
        if (borrowedBooksCount >= 2) {
            return response.status(400).json({ error: "Anggota sudah meminjam 2 buku. Tidak dapat meminjam lebih banyak." });
        }

        const dataBook = await book.findOne({
            where :{id_book: request.body.id_book}
        })
        if(dataBook.stock === 0){
            return response.status(400).json({ error: "Stock buku habis!" });
        }

        let newPinjaman = {
            id_member: id_member,
            id_book: request.body.id_book,
            tanggal_pinjam: new Date(),
            tanggal_pengembalian: null,
            is_returned: false,
            penalty_applied: false,
        }

        await pinjaman.create(newPinjaman);

        await book.update(
            {stock: dataBook.stock - 1},
            {where: {
                id_book: request.body.id_book
            }}
        );

        return response.json({
            message: "Buku berhasil di Pinjam!",
        });

    } catch (e) {
        return response.status(400).json({
            error: e.message,
        });
    }
})

app.post("/kembali/:id_member", async(request, response)=>{
    try {
        const id_member = request.params.id_member;
        const { id_book, return_date } = request.body;

        const dataBook = await book.findOne({
            where :{id_book: request.body.id_book}
        })

        const borrowedBook = await pinjaman.findOne({ where: { id_member: id_member, id_book: id_book, is_returned: false } });
        if (!borrowedBook) {
            return response.status(400).json({ error: "Buku yang dikembalikan tidak ditemukan dalam riwayat peminjaman anggota." });
        }

        // Hitung selisih hari
        const borrowDate = new Date(borrowedBook.tanggal_pinjam);
        const returnDateTime = new Date(return_date);
        const daysDiff = Math.floor((returnDateTime - borrowDate) / (1000 * 60 * 60 * 24));

        if (daysDiff > 7) {
            await member.update({ penality_status: true }, { where: { id_member: id_member } });
            await borrowedBook.update({ is_returned: true, tanggal_pengembalian: returnDateTime, penalty_applied: true });
            await book.update({stock: dataBook.stock + 1}, {where: {id_book: request.body.id_book}});
            return response.json({ message: "Buku berhasil dikembalikan. Anggota dikenai denda."});
        }
      
        await borrowedBook.update({ is_returned: true, tanggal_pengembalian: returnDateTime });
        await book.update({stock: dataBook.stock + 1}, {where: {id_book: request.body.id_book}});
    
        return response.json({ message: "Buku berhasil dikembalikan." });
    } catch (e) {
        return response.status(400).json({
            error: e.message,
        });
    }
})

module.exports = app;