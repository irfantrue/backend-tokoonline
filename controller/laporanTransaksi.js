const Produk = require(`../models/produk`);
const Validator = require(`fastest-validator`);
const Users = require(`../models/userdb`);
const v = new Validator();
const jwt_decode = require(`jwt-decode`);
const Transaksi = require('../models/transaksi');
const Pembayaran = require(`../models/pembayaran`);
const { Op } = require("sequelize");
const fs = require(`fs`)
const XLSX = require("xlsx");
const path = require(`path`);


function deleteFile (file) {

    fs.unlink(file, () => {

        console.log(`${file} DELETED!`)

    })
}

module.exports = {
    
    laporanPenjualan: async (req, res) => {
        try {
            let {
                startDate,
                endDate
            } = req.body;

            startDate= new Date(Date.parse(`2022-05-24T02:28`));
            endDate = new Date(Date.parse(`2022-05-27T02:28`));

            const transaksi = await Transaksi.findAll({
                where:{
                    [Op.or]: [{
                        createdAt: {
                            [Op.between]: [startDate, endDate]
                        }
                    }, {
                        createdAt: {
                            [Op.between]: [startDate, endDate]
                        }
                    }]
                }
            });

            let workbook = XLSX.utils.book_new() // Create new book excel

            let data = JSON.stringify(transaksi) // Value from "karyawan" convert to string

            console.log(data)

            let content = JSON.parse(data) // Parse value from variable "data"

            let worksheet = XLSX.utils.json_to_sheet(content) // Convert data from json to sheet

            let nameXLSX = `sample.xlsx` // Name for new file excel

            XLSX.utils.book_append_sheet(workbook, worksheet, `sheet1`) // Process insert data to new book

            XLSX.writeFile(workbook, nameXLSX) // Write file excel

            res.download(nameXLSX);

            return res.json({ status: 200 });
            
        } catch (error) {
            console.log(error)
            return res.status(500).json({ msg: `Invalid` });
        }
    }
}