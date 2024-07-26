import express from 'express'
import {createServer} from 'http'
import { Server } from 'socket.io'
import {LlamaModel,LlamaContext, LlamaChatSession} from 'node-llama-cpp'
import path from 'path'
import { fileURLToPath } from 'url'
import cors from 'cors'
const app = express()

const server = createServer(app)
const PORT = 8000
app.use(cors({
    origin:"*"
}))
const io = new Server(server,{
    cors:{
        origin:"*"
    }
})

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const model = new LlamaModel({
    modelPath: path.join(__dirname, "models", "capybarahermes-2.5-mistral-7b.Q4_K_M.gguf")
});
const context = new LlamaContext({model});
const session = new LlamaChatSession({context});



   



io.on('connection',(socket)=>{
    console.log('new connection');
    socket.on('message',async(message)=>{
        const response = await session.prompt(msg)
        socket.emit('response',response)
    })
})


server.listen(8000,()=>console.log(`server is connected at port${PORT}`))