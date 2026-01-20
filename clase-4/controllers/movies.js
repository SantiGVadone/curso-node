import { MovieModel } from "../models/movie.js"
import { validateMovie, validatePartialMovie } from "../schemes/movies.js"


export class MoviesController{
    static async getAll (req, res) {
    try {
        const { genre } = req.query
        const movies = await MovieModel.getAll({ genre })
        res.json(movies)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
    }
    static async getById (req,res) { 
    //esto es crear un end point, osea que estoy 
    // creando un lugar donde se puede cargar ese parametro id
    
    try{
        const {id} = req.params
        const movie = await MovieModel.getById({id})

        if(!movie){
            return res.status(404).json({message:'Movie not found'})
        }

        res.json(movie)

    } catch{
        res.status(500).json({error: error.message})
    }  
    }

    static async create (req,res){
        try{
            const result = validateMovie(req.body)
            if(!result.success){ //esto seria lo mismo que decir result.error
                return res.status(400).json({error: JSON.parse(result.error.message)})
            }
    
            const newMovie = await MovieModel.create({input: result.data})
            
            res.status(201).json(newMovie) //recurso creado
        }catch{
            res.status(500).json({error: error.message})
        }
        
    }

    static async delete (req, res) {
    try{
        const { id } = req.params
        
        const result = await MovieModel.delete({ id })

        if (result === false) {
            return res.status(404).json({ message: 'Movie not found' })
        }

        res.json({ message: 'Movie deleted' })
    }catch{
        res.status(500).json({ error: error.message })
    }
    }
    static async update (req,res){
        try{
            const result = validatePartialMovie(req.body)
            if(!result.success){
                return res.status(400).json({error: JSON.parse(result.error.message)}) //algunas de las actualizaciones no son validas
            }
    
            const {id} = req.params
    
            const updatedMovie = await MovieModel.update({id , input: result.data})
            
            if(updatedMovie === -1){
                return res.status(404).json({message:'Movie not found'})
            }
    
            res.json(updatedMovie)
        }catch (error){
            res.status(500).json({error: error.message})
        }
    }

}