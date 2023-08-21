const express = require('express')
const sequalize = require('./app/Model/database')
const ArticleRoutes = require('./Routes/ArticleRoutes')
const AuthorRoutes = require('./Routes/AuthorRoutes')
const sockets = require('./sockets/socket')
const http = require('http')
const cors = require('cors')
const {Server} = require('socket.io')
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger/swagger.json')
const app = express()
const port = 3025
app.use(cors())
app.use(express.json())
app.use('/article',ArticleRoutes)
app.use('/author',AuthorRoutes)


async function Init()
{
  const response = await sequalize.sync()
  if(response)
  {
    app.use('/api',swaggerUi.serve,swaggerUi.setup(swaggerDocument))
    const server = http.createServer(app)
    const io = new Server(server,{
      cors : {
        origin: "http://localhost:5173"
      }
    })
    sockets(io)
    server.listen(port,()=>{
      console.log('Server Is Working')
    })
  }
}Init()


