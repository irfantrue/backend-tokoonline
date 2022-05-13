const {Sequelize} = require(`sequelize`);
const db = require(`../database`);

const {DataTypes} = Sequelize;

const Transaksi = db.define(`transaksi`,{
    id_produk:{
        type: DataTypes.INTEGER
    },
    id_user:{
        type: DataTypes.INTEGER
    },
    id_pembayaran:{
        type: DataTypes.INTEGER
    },
    image:{
        type: DataTypes.STRING
    },
    alamat_user:{
        type: DataTypes.TEXT
    },
    alamat_tujuan:{
        type: DataTypes.TEXT
    },
    pembayaran:{
        type: DataTypes.STRING
    },
    jumlah:{
        type: DataTypes.INTEGER
    },
    harga:{
        type: DataTypes.INTEGER
    },
    total_harga:{
        type: DataTypes.INTEGER
    },
    status:{
        type: DataTypes.STRING
    },
},{
    freezeTableName: true
});

module.exports = Transaksi;