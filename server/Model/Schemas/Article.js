const {DataTypes} = require('sequelize')
const sequalize = require('../database')

const ArticleObject = {
    title:{
        type:DataTypes.STRING,
        allowNull:false
    },
    body:{
        type:DataTypes.STRING,
        allowNull:false
    },

}
const ArticleTableObject = {
    freezeTableName: true
}

const Article = sequalize.define('Article',ArticleObject,ArticleTableObject)

module.exports = Article