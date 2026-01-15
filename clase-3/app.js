const express = require('express') // usamos el require porque estamos usando common js
const movies = require('./movies')
const crypto = require('node:crypto')
const {validateMovie,validatePartialMovie} = require('./schemes/movies.js')

const app = express()
app.use(express.json())

app.disable('x-powered-by') //deshabilita el header x-powered-by: Express

app.get('/',(req,res)=>{
    res.json({message:'Hola Mundo'})
})

app.get('/movies',(req,res)=>{
    res.header('Access-Control-Allow-Origin','*') // podes poner solo los origenes que aceptas ejemplo http://localhost:8080,
                                                    //o podes poner '*' y de esa forma le das entrada a todos los dominios
//esto funciona para los metodos como put get pathc, no para los metodos complejos como el delete

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
    const result = validateMovie(req.body)
    if(!result.success){ //esto seria lo mismo que decir result.error
        return res.status(400).json({error: JSON.parse(result.error.message)})
    }

    const newMovie = {
        id: crypto.randomUUID(), // crea un UUID (IDENTIFICADOR UNICO UNIVERSAL) version 4
        ...result.data
    }
        
    //esto no seria rest porque estamos guardando
    //el estado de la aplicacion en memoria
    movies.push(newMovie)
        
    res.status(201).json(newMovie) //recurso creado

})

app.patch('/movies/:id',(req,res)=>{

    
    const result = validatePartialMovie(req.body)

    if(!result.success){
        return res.status(400).json({error: JSON.parse(result.error.message)}) //algunas de las actualizaciones no son validas
    }

    const {id} = req.params

    const movieIndex = movies.findIndex(movie => movie.id === id)

    if(movieIndex === -1){
        return res.status(404).json({message:'Movie not found'}) //esta en -1 porque no se encontro la pelicula
    }  

    const updateMovie = { //esto va a ser igual a todo lo que tengamos de la peli + todo lo que tengamos de la data nueva
        ...movies[movieIndex], //agarra todos los datos viejos
        ...result.data         //agarra todos los datos nuevos, y los pone encima
    }
    
    movies[movieIndex] = updateMovie //deja de estar en el aire y lo remplaza

    return res.json(updateMovie)

})

const PORT = process.env.PORT || 1234

app.listen(PORT,()=>{
    console.log(`Servidor corriendo en el puerto ${PORT}`)
}) 