const {Sequelize} = require(`sequelize`);
const db = require(`../database`);

const {DataTypes} = Sequelize;

const Users = db.define(`users`,{
    fullname:{
        type: DataTypes.STRING
    },
    email:{
        type: DataTypes.STRING
    },
    password:{
        type: DataTypes.STRING
    },
    address:{
        type: DataTypes.TEXT
    },
    level:{
        type: DataTypes.STRING
    }
},{
    freezeTableName:true
});

module.exports = Users;