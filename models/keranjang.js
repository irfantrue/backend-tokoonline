const {Sequelize} = require(`sequelize`);
const db = require(`../database`);

const {DataTypes} = Sequelize;

const Keranjang = db.define(`keranjang`,{
    id_produk:{
        type: DataTypes.INTEGER
    },
    id_user:{
        type: DataTypes.INTEGER
    }
},{
    freezeTableName: true
});

module.exports = Keranjang;