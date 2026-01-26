import express, { json } from 'express' // usamos el require porque estamos usando common js

import { createMovieRouter } from './routes/movies.js'   //importo las rutas que hice en routes/movies.js

import { corsMiddleware } from './middlewares/cors.js'  //importo los middlewares donde tengo los cors


export const createApp = ({movieModel})=>{

    const app = express()

    app.use(json())
    app.use(corsMiddleware()) //corsMiddleware(ACA PODRIA PASARLE MAS ORIGENES ACEPTADOS PARA LOS CORS POR EJEMPLO)
    app.disable('x-powered-by') //deshabilita el header x-powered-by: Express

    // CORS Cross-Origin Resourse Sharing

    app.use('/movies',createMovieRouter({movieModel})) //cuando acceso a /movies cargo todas las rutas que tengo en esa direccion 

    const PORT = process.env.PORT ?? 1234

    app.listen(PORT,()=>{
        console.log(`Servidor corriendo en el puerto http://localhost:${PORT}`)
    }) 
}

