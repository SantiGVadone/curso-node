const z = require('zod')


const movieSchema = z.object({
        title: z.string({
            invalid_type_error: 'Movie title must be a string',
            required_error: 'Movie title is required'
        }),
        year: z.number().int().min(1900).max(2026),
        director: z.string(),
        duration: z.number().positive(),
        poster: z.string().url(),
        genre: z.array(
            z.enum(['Action','Adventure','Comedy','Crime','Drama',
                    'Fantasy','Horror','Thriller','Sci-Fi','Romance','Biography'])
        ),
        rate: z.number().max(10).min(0).default(5)
})


function validateMovie(object){
    return movieSchema.safeParse(object)//el safeparse a te da un objeto de respuesta que dice si hay error o si no hay error
} 

function validatePartialMovie(input){
    return movieSchema.partial().safeParse(input)
}

module.exports = {
    validateMovie,
    validatePartialMovie
}