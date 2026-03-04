import {WebSocketServer} from "ws"

const wss = new WebSocketServer({port:8080})

wss.on("connection",(socket,request)=>{

    const ip = request.socket.remoteAddress

    socket.on("message",(data)=>{

        const Data = data.toString()

        console.log(`DATA => ${Data}`)

        ws.clients.forEach((client)=>{
            if(client.readyState === WebSocket.OPEN) client.send(`Server broadcast : ${Data}`)
        })
    })


    socket.on("error",(err)=>{
        console.log(`ERROR : ${err}`)

    })


    socket.on("close",()=>{
        console.log(`THE CONNECTION IS CLOSED`)
    })



})

console.log("WEB SOCKET SERVER IS LIVE")