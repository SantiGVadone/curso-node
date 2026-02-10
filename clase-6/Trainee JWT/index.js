import express from 'express'

import { corsMiddleware } from './middelware/cors.js'
import { PORT } from './config.js'

const app = express()

app.use(corsMiddleware())
app.use(express.json())
app.disable('x-powered-by')

app.get('/',(req,res) => {
    res.send('<h1>Hello Santi</h1>')
})

app.post('/login',(req,res)=>{})

app.post('/register',(req,res)=>{
    const {username,password} = req.body
    console.log(req.body)

    
})

app.post('/logout',(req,res)=>{})

app.get('/protected',(req,res)=>{})

app.listen(PORT,()=> {
    console.log(`Server is running on http://localhost:${PORT}`)
})