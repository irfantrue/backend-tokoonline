const {Sequelize} = require(`sequelize`);
const db = require(`../database`);

const {DataTypes} = Sequelize;

const Pembayaran = db.define(`pembayaran`, {
    id_user:{
        type: DataTypes.INTEGER
    },
    image:{
        type: DataTypes.STRING
    },
    desc:{
        type: DataTypes.STRING
    },
    status:{
        type: DataTypes.STRING
    },
    total_harga:{
        type: DataTypes.INTEGER
    },
},{
    freezeTableName: true
});

module.exports = Pembayaran;