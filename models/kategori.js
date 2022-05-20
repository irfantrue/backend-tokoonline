const {Sequelize} = require(`sequelize`);
const db = require(`../database`);

const {DataTypes} = Sequelize;

const Kategori = db.define(`kategori`,{
    nama_kategori:{
        type: DataTypes.STRING
    },
    slug:{
        type: DataTypes.STRING
    },
},{
    freezeTableName:true
});

module.exports = Kategori;