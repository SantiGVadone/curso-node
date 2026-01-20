import movies from '../movies.json'

export class MovieModel {
    static getAll({genre}){
        if (genre) {
            return movies.filter(
              movie => movie.genre.some(g => g.toLowerCase() === genre.toLowerCase())
            )
          }
          return movies
    }
}