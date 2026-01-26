import mysql from 'mysql2/promise';


const config = {
    host: 'localhost',
    user: 'root',
    password: '', //por ahora no tenemos password
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

    static async create ({input}) {
        
        const {
            genre: genreInput,
            title,
            year,
            director,
            duration,
            poster,
            rate
        } = input;

        const [ uuidResult] = await connection.query('SELECT UUID() uuid;');
        const [{uuid}] = uuidResult
        
        try{

            await connection.query(
            'INSERT INTO movie (id, title, year, director, duration, poster, rate) VALUES (UUID_TO_BIN(?),?, ?, ?, ?, ?, ?)',
            [ uuid ,title, year, director, duration, poster, rate] );

        }catch(error){
            console.log(error)
            throw new Error('Error creating movie')
        }
        
        for (const genre of genreInput) {
            const [genresDb]= await connection.query(
                'SELECT id FROM GENRE WHERE LOWER(name) = ?;', [genre.toLowerCase()]
            );

        if (genresDb.length > 0) {
            const genreId = genresDb[0].id;

            await connection.query(
                'INSERT INTO movie_genres (movie_id, genre_id) VALUES (UUID_TO_BIN(?), ?)',
                [uuid, genreId]
            );
            }
        }

        const [movie]=await connection.query(
            'SELECT BIN_TO_UUID(m.id) id, m.title,m.year,m.director,m.duration,m.poster,m.rate FROM movie m  WHERE m.id = UUID_TO_BIN(?)',[uuid]
        );
        return movie[0];
    }

    static async delete ({id}) {
        const [pelicula] = await connection.query(
            'SELECT * FROM movie WHERE id = UUID_TO_BIN(?)', [id]
        );
        await connection.query(
            'DELETE FROM movie_genres WHERE movie_id = UUID_TO_BIN(?)', [id]
            );
        await connection.query(
            'DELETE FROM movie WHERE id = UUID_TO_BIN(?)', [id]
        );

        return pelicula[0]

    }
  
    static async update ({id, input}) {
        const {
            genre: genreInput,
            title,
            year,
            director,
            duration,
            poster,
            rate
        } = input;

        
        const [movies] = await connection.query(
            'SELECT * FROM movie WHERE id = UUID_TO_BIN(?)', [id]
        ); 

        if (movies.length === 0) return false; //si no encuentra la pelicula a actulizar da un false

        //antes de actualizar la pelicula tengo que cargar los valores que ya tiene la pelicula, y arriba ponerle los nuevos 
        const movieInDb = movies[0];

        const updatedMovie = {
            ...movieInDb,
            ...input
        }

        await connection.query(
            'UPDATE movie SET title = ?, year = ?, director = ?, duration = ?, poster = ?, rate = ? WHERE id = UUID_TO_BIN(?)',
            [updatedMovie.title, updatedMovie.year, updatedMovie.director, updatedMovie.duration, updatedMovie.poster, updatedMovie.rate, id]
        );
        //CON ESTE IF ESTOY VIENDO SI GENREINPUT TIENE ALGO, SI TIENE ALGO BORRO LOS GENEROS VIEJOS Y PONGO LOS NUEVOS
        if (genreInput){
            await connection.query(
                'DELETE FROM MOVIE_GENRES WHERE movie_id = UUID_TO_BIN(?)', [id]
            );

            for (const genre of genreInput) { //por cada genero que este en genreInput
                const [genreDb] = await connection.query(
                    'SELECT id FROM genre WHERE LOWER(name) = ?;', [genre.toLowerCase()] //me fijo que id tienen, a ver si existen tambien
                );
                
                if (genreDb.length > 0) { //si existen 
                    await connection.query(
                        'INSERT INTO movie_genres (movie_id, genre_id) VALUES (UUID_TO_BIN(?), ?)', //los inserto
                        [id, genreDb[0].id]
                    );
                }
            }
        }
        //es una buena practica que para devolver la pelicula actualizada se la busque en la db 
        const [updatedMovieResult] = await connection.query(
            'SELECT BIN_TO_UUID(m.id) id, m.title,m.year,m.director,m.duration,m.poster,m.rate FROM movie m  WHERE m.id = UUID_TO_BIN(?)',[id]
        );
        return updatedMovieResult[0]

    }
}