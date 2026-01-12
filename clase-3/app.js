const express = require('express') // usamos el require porque estamos usando common js
const movies = require('./movies')
const crypto = require('node:crypto')


const app = express()
app.use(express.json())

app.disable('x-powered-by') //deshabilita el header x-powered-by: Express

app.get('/',(req,res)=>{
    res.json({message:'Hola Mundo'})
})

app.get('/movies',(req,res)=>{
    const {genre} = req.query
    if(genre){
        const filteredMovies = movies.filter(
            movie => movie.genre.some( g=> g.toLowerCase() === genre.toLowerCase())
        )
        return res.json(filteredMovies)
    }
    res.json(movies)
})

app.get('/movies/:id',(req,res)=>{ //esto es crear un end point, osea que estoy 
                                    // creando un lugar donde se puede cargar ese parametro id
    const {id} = req.params
    const movie = movies.find(movie => movie.id === id)
    if(movie){
        return res.json(movie)
    }
    res.status(404).json({message:'Movie not found'})
}) //esto se conoce como path-to-regexp 

app.post('/movies',(req,res)=>{
    const {
        title,
        director,
        year,
        rate,
        poster,
        genre
    } = req.body

    const newMovie = {
        id: crypto.randomUUID(), // crea un UUID (IDENTIFICADOR UNICO UNIVERSAL) version 4
        title,
        director,
        year,
        rate,
        poster,
        genre
    }
        

    //esto no seria rest porque estamos guardando
    //el estado de la aplicacion en memoria
    movies.push(newMovie)
        
    res.status(201).json(newMovie) //recurso creado

})


const PORT = process.env.PORT || 1234

app.listen(PORT,()=>{
    console.log(`Servidor corriendo en el puerto ${PORT}`)
}) 