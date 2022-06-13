const {Sequelize} = require(`sequelize`);
const db = require(`../database`);

const {DataTypes} = Sequelize;

const Transaksi = db.define(`transaksi`,{
    kode_odr:{
        type: DataTypes.STRING,
        unique: true
    },
    id_produk:{
        type: DataTypes.INTEGER
    },
    id_user:{
        type: DataTypes.INTEGER
    },
    id_pembayaran:{
        type: DataTypes.INTEGER
    },
    alamat_tujuan:{
        type: DataTypes.TEXT
    },
    tgl_pengiriman:{
        type: DataTypes.DATE
    },
    pembayaran:{
        type: DataTypes.STRING
    },
    jumlah:{
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