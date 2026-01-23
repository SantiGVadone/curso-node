import mysql from 'mysql2/promise';


const config = {
    host: 'localhost',
    user: 'root',
    password: '', //por ahora no tenemos pass
    database: 'moviesdb',
    port: 3306
}

const connection = await mysql.createConnection(config);

export class MovieModel {
    static async getAll ({genre}) {
        if(genre){
            const lowerCaseGenre = genre.toLowerCase()
            const [genres] = await connection.query(
                'SELECT id, name FROM genre WHERE LOWER(name) = ?;',[lowerCaseGenre]
            );
            const [movies] = await connection.query(
                'SELECT m.title, m.year, m.director , m.duration, m.poster, m.rate, BIN_TO_UUID(m.id) id FROM movie m LEFT JOIN movie_genres mg ON m.id = mg.movie_id WHERE mg.genre_id = ?;',[genres[0].id]
            );
            return movies
        }

        const movies = await connection.query(
            'SELECT title, year, director , duration, poster, rate, BIN_TO_UUID(id) id FROM movie'
        );
        return movies[0]
    }

    static async getById({id}){
        const [movies] = await connection.query(
            'SELECT m.title, m.year, m.director , m.duration, m.poster, m.rate, BIN_TO_UUID(m.id) id FROM movie m WHERE m.id = UUID_TO_BIN(?)', [id]
        );
        return movies
    }

    static async create (input) {
        
        const {
            title,
            year,
            director,
            duration,
            poster,
            rate
        } = input;

        const [ uuidResult] = await connection.query('SELECT UUID() uuid;');
        const [{uuid}] = uuidResult

        const [result] = await connection.query(
            'INSERT INTO movie (id, title, year, director, duration, poster, rate) VALUES (?, ?, ?, ?, ?, ?)',
            [ uuid ,title, year, director, duration, poster, rate] );
    }

    static async delete ({id}) {}
  
    static async update ({id, input}) {}
}