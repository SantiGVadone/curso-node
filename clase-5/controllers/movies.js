//saco este import ya que ahora lo estoy haciendo por inyeccion de dependencia, asi es mas seguro
//ya que al pasarle el movie model desde afuera, es mas seguro porque el controllador no sabe lo que esta utilizando
//digamos que de esa forma el controlador dice ahora tengo que llamar a la cosa que tengo en esta variable
//import { MovieModel } from "../models/database/mysql/movie.js"; 
import { validateMovie, validatePartialMovie } from "../schemes/movies.js"

export class MovieController{
    constructor({movieModel}){
        this.movieModel = movieModel
    }
    getAll = async (req, res)=> {
    try {
        const { genre } = req.query
        const movies = await this.movieModel.getAll({ genre })
        res.json(movies)
    } catch (error) {
        res.status(500).json({ error: error.message }) //es mejor enviar un error nuevo, por las dudas que el error mande algo importante
    }
    }
    getById = async (req,res)=>  { 
    //esto es crear un end point, osea que estoy 
    // creando un lugar donde se puede cargar ese parametro id
    
    try{
        const {id} = req.params
        const movie = await this.movieModel.getById({id})

        if(!movie){
            return res.status(404).json({message:'Movie not found'})
        }

        res.json(movie)

    } catch(error){
        res.status(500).json({error: error.message})
    }  
    }

    create = async (req,res)=>{
        try{
            const result = validateMovie(req.body)
            if(!result.success){ //esto seria lo mismo que decir result.error
                return res.status(400).json({error: JSON.parse(result.error.message)})
            }
    
            const newMovie = await this.movieModel.create({input: result.data})
            
            res.status(201).json(newMovie) //recurso creado
        }catch(error){
            res.status(500).json({error: error.message})
        }
        
    }

    delete = async (req, res) => {
    try{
        const { id } = req.params
        
        const result = await this.movieModel.delete({ id })

        if (result === false) {
            return res.status(404).json({ message: 'Movie not found' })
        }

        res.json({ message: 'Movie deleted' })
    }catch(error){
        res.status(500).json({ error: error.message })
    }
    }
    update = async (req,res)=>{
        try{
            const result = validatePartialMovie(req.body)
            if(!result.success){
                return res.status(400).json({error: JSON.parse(result.error.message)}) //algunas de las actualizaciones no son validas
            }
    
            const {id} = req.params
    
            const updatedMovie = await this.movieModel.update({id , input: result.data})
            
            if(updatedMovie === -1){
                return res.status(404).json({message:'Movie not found'})
            }
    
            res.json(updatedMovie)
        }catch (error){
            res.status(500).json({error: error.message})
        }
    }

}