const {Sequelize} = require(`sequelize`);
const db = require(`../database`);

const {DataTypes} = Sequelize;

const Pembayaran = db.define(`pembayaran`, {
    kode_pby:{
        type: DataTypes.STRING,
        unique: true
    },
    id_user:{
        type: DataTypes.INTEGER
    },
    image:{
        type: DataTypes.STRING
    },
    desc:{
        type: DataTypes.TEXT
    },
    status:{
        type: DataTypes.STRING
    },
    ongkir:{
        type: DataTypes.INTEGER
    },
    total_harga:{
        type: DataTypes.INTEGER
    },
},{
    freezeTableName: true
});

module.exports = Pembayaran;