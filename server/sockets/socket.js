function sockets(io)
{
    io.on('connection',(socket)=>{
        console.log(`User ${socket.id} connected`)
        socket.on('Created Article',()=>{
            RefreshArticles(socket)
            socket.broadcast.emit('Created Article')
        })
        socket.on('Article Deleted',(data)=>{
            RefreshArticles(socket)
            socket.broadcast.emit('Article Deleted',data)
        })
        socket.on('Article Edited',(data)=>{
            RefreshArticles(socket)
            socket.broadcast.emit('Article Edited',data)
        })
    })
}

function RefreshArticles(socket)
{
    socket.broadcast.emit('Refresh Articles')
}
module.exports =  sockets