const express = require('express')
const router = express.Router()
const AuthorController = require('../app/Controller/AuthorController')


for(const item of AuthorController)
{
    router[item.method](item.route ?? '/',item.function)
}

module.exports = router