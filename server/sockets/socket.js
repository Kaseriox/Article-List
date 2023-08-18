function sockets(io)
{
    io.on('connection',(socket)=>{
        console.log(`User ${socket.id} connected`)
        socket.on('Created Article',()=>{
            RefreshArticles(socket)
        })
        socket.on('Article Deleted',()=>{
            RefreshArticles(socket)
        })
        socket.on('Article Edited',()=>{
            RefreshArticles(socket)
        })
    })
}

function RefreshArticles(socket)
{
    socket.broadcast.emit('Refresh Articles')
}
module.exports =  sockets