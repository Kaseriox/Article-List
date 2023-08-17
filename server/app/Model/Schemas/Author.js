const {DataTypes} = require('sequelize')
const sequalize = require('../database')

const AuthorObject = {
    name:{
        type: DataTypes.STRING,
        allowNull:false,
        validate: {
            notEmpty:true,
            isAlpha:true,
        }

    },
    surname:{
        type:DataTypes.STRING,
        allowNull:false,
        validate: {
            notEmpty:true,
            isAlpha:true,
        }
    }
}
const AuthorTableOptions = {
    freezeTableName: true
}

const Author = sequalize.define('Author',AuthorObject,AuthorTableOptions)
module.exports = Author