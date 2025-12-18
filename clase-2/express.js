const express = require('express')
const app = express()
const ditto = require('./pokemon/ditto.json')


const PORT = process.env.PORT ?? 1234

app.disable('x-powered-by')

// MI PRIMER MIDDLEWARE
app.use((req,res,next)=>{ //en ves de use podrias poner get, o post o algun metodo
                        // de esta forma crearias un middleware en especifico para ese metodo
    if (req.method !== 'POST' ){
        return next()
    }
    if(req.headers['content-type'] !== 'application/json'){
        return next()
    }
    
    //ENTONCES GRACIAS A ESTOS NEXT, ACA SOLO VAN A LLEGAR LAS REQUEST QUE TENGAN 
    // EL METODO POST Y QUE TENGAN EL HEADER CONTENT TYPE APPLICATION JSON 
    console.log('mi middleware')
    
    let body = ''
    //escucho el evento data
    req.on('data', chunk => {
        body += chunk.toString()
    })

    req.on('end', () => { //me fijo cuando llega el evento de que termino
        const data = JSON.parse(body)
        data.timestamp = Date.now()
        //mutar la request y meter la informacion en el req.body
        req.body = data
        next()
        })
})

app.get('/', (req,res)=>{
    res.send('<h1>Mi página web</h1>')
})

app.get('/pokemon/ditto', (req,res)=>{
    res.json(ditto)
})

app.post('/pokemon', (req,res)=>{
    res.status(201).json(req.body)
})
// es importante que sea la ultima ASI PRIMERO PRUEBA EN TODAS LAS OTRAS
app.use((req,res)=>{
    res.status(404).send('<h1>404 Not Found</h1>')
})

app.listen(PORT, ()=>{
    console.log(`server listening on http://localhost:${PORT}`)
})