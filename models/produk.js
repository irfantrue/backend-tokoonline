const {Sequelize} = require(`sequelize`);
const db = require(`../database`);

const {DataTypes} = Sequelize;

const Produk = db.define(`produk`,{
    kode_prd:{
        type: DataTypes.STRING,
        unique: true
    },
    nama_produk:{
        type: DataTypes.STRING,
        unique: true
    },
    id_kategori:{
        type: DataTypes.INTEGER
    },
    desc:{
        type: DataTypes.TEXT
    },
    harga:{
        type: DataTypes.INTEGER
    },
    image:{
        type: DataTypes.STRING
    },
    slug:{
        type: DataTypes.STRING,
        unique: true
    }
},{
    freezeTableName: true
});

module.exports = Produk;