const express = require('express')
const router = express.Router()
const AuthorController = require('../Controller/AuthorController')


for(const item of AuthorController)
{
    router[item.method]('/',item.function)
}

module.exports = router