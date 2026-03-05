import { useEffect, useState } from 'react'

import './App.css'




function App() {
  const [status, setStatus] = useState("Connecting...")
  const [log,setLog] = useState([])

  const [connection, setConnection] = useState(null)
  
    useEffect(()=>{
    

    
      const ws = new WebSocket("ws://localhost:8080")
      setConnection(ws)
        
      ws.addEventListener("open",()=>{
        setStatus("CONNECTED TO ws://localhost:8080")
        setLog((prev)=>["[SYSTEM]---TUNNEL ESTABLISHED",...prev])
      })

      ws.addEventListener("message",(event)=>{
        const entry = `${new Date().toLocaleTimeString()} ${event.data}`
        setLog((prev)=>[`[RECEIVED]---${entry}`,...prev])
      })


      ws.addEventListener("error",(err)=>{
        console.log(`ERROR WHILE CONNECTING...${err}`)
      })


      ws.addEventListener("close",()=>{
        setStatus("CONNECTION CLOSED")
        console.log("CONNECTION CLOSED")

        setLog((prev)=>["[SYSTEM]---TUNNEL COLLAPSED",...prev])
      })

      

      return () => ws.close()


    },[])


    function handleSubmit(e){
        e.preventDefault()
        if(!connection ||connection.readyState!== WebSocket.OPEN){
          console.log("THE CONNECTION IS NOT ESTABLISHED")
          return}
        const message = e.target.elements[0].value
        connection.send(message)

        setLog((prev)=>[`[SENT]---${message}`,...prev])
  }

  
  
  



  return (
    <>
    
    
    <div className='bg-black text-amber-500 min-h-screen w-screen text-center '>
      
      
      <p className='font-bold text-white'>------LOCAL BROADCAST CONSOLE------</p>
      <p id="status" 
      
      className='text-green-600'>{status}</p>
      
      
      <form id="message-form" 
      className='pt-20'
      onSubmit={handleSubmit}>
        
        <input id="message-input"
        type="text" 
        placeholder="ENTER TEXT" 
        className='bg-gray-400 border-2 rounded-lg text-black'
        required/>


        <button type='submit'
         className='ml-5 p-2 border-amber-400 border-2 rounded-lg'>submit</button>
      </form>


      <h3 className='pt-10'>Live Stream Logs :</h3>
      <pre id="log" 
      className='border-2 h-150 w-300 border-amber-400 ml-33 text-green-600'>{log.join("\n")}</pre>
    
    
    </div>
    </>
  )
}

export default App

