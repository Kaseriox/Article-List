const {DataTypes} = require('sequelize')
const sequalize = require('../database')
const Article = require('./Article')

const AuthorObject = {
    name:{
        type: DataTypes.STRING,
        allowNull:false
    },
    surname:{
        type:DataTypes.STRING,
        allowNull:false
    }
}
const AuthorTableOptions = {
    freezeTableName: true
}

const Author = sequalize.define('Author',AuthorObject,AuthorTableOptions)
Author.hasMany(Article, {
    foreignKey:{
        allowNull:false,    
        name:'AuthorID',
    
    },
    onDelete: 'CASCADE' 
  });
module.exports = Author