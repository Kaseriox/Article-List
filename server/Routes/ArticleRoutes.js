const express = require('express')
const router = express.Router()
const ArticleController = require('../Controller/ArticleController')

for(const item of ArticleController)
{
    router[item.method]('/',item.function)
}

module.exports = router