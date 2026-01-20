import { randomUUID } from 'crypto'
import movies from '../movies.json' with { type: 'json' }
//esta es la forma de importar un json en ES Modules

export class MovieModel {
    static async getAll ({genre}) {
        if (genre) {
            return movies.filter(
              movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
            )
          }
          return movies
    }

    static async getById({id}){
      const movie = movies.find(movie => movie.id === id)
      return movie
    }

    static async create (input) {
      const newMovie = {
        id: randomUUID(), // crea un UUID (IDENTIFICADOR UNICO UNIVERSAL) version 4
        ...input
    } 
      //esto no seria rest porque estamos guardando
      //el estado de la aplicacion en memoria
      movies.push(newMovie)

     return newMovie
    }

    static async delete ({id}) {
      const movieIndex = movies.findIndex(movie => movie.id === id)

      if (movieIndex === -1)return false
      
        movies.splice(movieIndex, 1)
        return true
    }
  

    static async update ({id, input}) {
      const movieIndex = movies.findIndex(movie => movie.id === id)
  
      if (movieIndex === -1) {
        return -1
      }
  
      const updateMovie = {   //esto va a ser igual a todo lo que tengamos de la peli + todo lo que tengamos de la data nueva
        ...movies[movieIndex],//agarra todos los datos viejos
        ...input              //agarra todos los datos nuevos, y los pone encima
      }
  
      movies[movieIndex] = updateMovie  //deja de estar en el aire y lo remplaza
  
      return updateMovie
    }
}