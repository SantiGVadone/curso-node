const z=require('zod');

const bookSchema = z.object({
    title: z.string({
        invalid_type_error: 'El titulo debe ser un string',
        required_error: 'El titulo es requerido'
    }),
    author: z.string({
        invalid_type_error: 'El Autor debe ser un string',
        required_error: 'El Autor es requerido'
    }).min(2),
    // year: z.number().min(1900).max(new Date().getFullYear()),
    year: z.number().min(1900).max(2026),
    genre: z.array(
        z.enum(['Fantasy','Adventure','Sci-Fi','Dystopian','Children',
            'Technology','Programming','Education','Classic','Drama','Horror'])
    ),
    pages: z.number().min(1).int(),
    rate: z.number().positive().max(10)
})

function validateBook(input){
    return bookSchema.safeParse(input);
}

function validatePartialBook(input){
    return bookSchema.partial().safeParse(input);
}

module.exports={
    validateBook,
    validatePartialBook

}