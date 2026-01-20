import express, { json } from 'express' // usamos el require porque estamos usando common js

//import movies, { filter, find, push, findIndex, splice } from './movies.json' //este me lo esta importando mal porque es json 
import movies from './movies.json' assert { type: 'json' } //esta es la forma correcta de importar un json en ES Modules

//importo las rutas que hice en routes/movies.js
import { moviesRouter } from './routes/movies.js'

//importo los middlewares donde tengo los cors
import { corsMiddleware } from './middlewares/cors.js'

const app = express()

app.use(json())
app.use(corsMiddleware()) //corsMiddleware(ACA PODRIA PASARLE MAS ORIGENES ACEPTADOS PARA LOS CORS POR EJEMPLO)
app.disable('x-powered-by') //deshabilita el header x-powered-by: Express

// métodos normales: GET/HEAD/POST
// métodos complejos: PUT/PATCH/DELETE

// CORS PRE-Flight
// OPTIONS

app.use('/movies',moviesRouter) //cuando acceso a /movies cargo todas las rutas que tengo en esa direccion 


const PORT = process.env.PORT ?? 1234

app.listen(PORT,()=>{
    console.log(`Servidor corriendo en el puerto http://localhost:${PORT}`)
}) 