const express = require('express')
const sequalize = require('./Model/database')
const ArticleRoutes = require('./Routes/ArticleRoutes')
const AuthorRoutes = require('./Routes/AuthorRoutes')
const app = express()
const port = 3000

app.use(express.json())
app.use('/article',ArticleRoutes)
app.use('/author',AuthorRoutes)


async function Init()
{
  const response = await sequalize.sync()
  if(response)
  {
    app.listen(port, () => {
      console.log(`Server Running On Port ${port}`)
    })
  }
}Init()




