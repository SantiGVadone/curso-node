import { Router } from "express";
import movies from './movies.json'

export const moviesRouter = Router()

moviesRouter.get('/',(req, res) => {
  const { genre } = req.query
  if (genre) {
    const filteredMovies = movies.filter(
      movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
    )
    return res.json(filteredMovies)
  }
  res.json(movies)
})

moviesRouter.get('/:id', (req,res)=>{ //esto es crear un end point, osea que estoy 
                                    // creando un lugar donde se puede cargar ese parametro id
    const {id} = req.params

    const movie = movies.find(movie => movie.id === id)
    if(movie){
        return res.json(movie)
    }
    res.status(404).json({message:'Movie not found'})
}) //esto se conoce como path-to-regexp 


moviesRouter.post('/',(req,res)=>{
    const result = validateMovie(req.body)
    if(!result.success){ //esto seria lo mismo que decir result.error
        return res.status(400).json({error: JSON.parse(result.error.message)})
    }

    const newMovie = {
        id: randomUUID(), // crea un UUID (IDENTIFICADOR UNICO UNIVERSAL) version 4
        ...result.data
    }
        
    //esto no seria rest porque estamos guardando
    //el estado de la aplicacion en memoria
    movies.push(newMovie)
        
    res.status(201).json(newMovie) //recurso creado
})


moviesRouter.delete('/:id',(req, res) => {
  const { id } = req.params
  const movieIndex = movies.findIndex(movie => movie.id === id)

  if (movieIndex === -1) {
    return res.status(404).json({ message: 'Movie not found' })
  }

  movies.splice(movieIndex, 1)

  return res.json({ message: 'Movie deleted' })
})


moviesRouter.patch('/:id',(req,res)=>{

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
