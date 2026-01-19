import express, { json } from 'express' // usamos el require porque estamos usando common js

//import movies, { filter, find, push, findIndex, splice } from './movies.json' //este me lo esta importando mal porque es json 
import movies from './movies.json' assert { type: 'json' } //esta es la forma correcta de importar un json en ES Modules

import { randomUUID } from 'node:crypto'
import cors from 'cors'

import { validateMovie, validatePartialMovie } from './schemes/movies.js'

//importo las rutas que hice en routes/movies.js

import { moviesRouter } from './routes/movies.js'


const app = express()
app.use(json())
app.use(cors({
    origin: (origin,callback)=>{
    const ACCEPTED_ORIGINS = [
        'http://localhost:8080',
        'https://localhost:1234',
        'https://movies.com'
    ]

    if(ACCEPTED_ORIGINS.includes(origin)){
        return callback(null,true)
    }

    if(!origin){
        return callback(null,true)
    }

    return callback(new Error('Not allowed by CORS'))

    }
}))
app.disable('x-powered-by') //deshabilita el header x-powered-by: Express

// métodos normales: GET/HEAD/POST
// métodos complejos: PUT/PATCH/DELETE

// CORS PRE-Flight
// OPTIONS

app.get('/movies', todo)

app.get('/movies/:id', todo)

app.post('/movies', todo)

app.delete('/movies/:id', todo )

app.patch('/movies/:id', todo)

const PORT = process.env.PORT ?? 1234

app.listen(PORT,()=>{
    console.log(`Servidor corriendo en el puerto http://localhost:${PORT}`)
}) 