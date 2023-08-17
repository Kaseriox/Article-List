const Author = require('./Author')
const Article = require('./Article')

Author.hasMany(Article, {
    onDelete: 'CASCADE',
    foreignKey:{
        allowNull:false,    
        name:'authorID',
    },
    as:"Article"
});
Article.belongsTo(Author,
    {
        foreignKey:'authorID'
    })

module.exports = {Author,Article}