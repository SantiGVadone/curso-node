/*
LA IDEA ES HACER UNA PRACTICA DONDE SE HAGA UNA API QUE PERMITA:
    UN GET DE .../LIBROS
    UN POST DE .../LIBROS
    UN PATCH DE .../LIBROS/:ID
    ahora le voy a pedir a una ia que me genere un .json con varios libros para poder practicar
    VOY A SUMAR PARA PRACTICAR UN GET DE LIBROS POR ID
*/


const express = require('express');
const libros = require('./libros.json');
const crypto = require('node:crypto');
const { id } = require('zod/locales');
const { validateBook, validatePartialBook } = require('./schemes/libros.js');

const app = express();
app.use(express.json());

app.disable('x-powered-by');

app.get('/', (req, res) => {
    res.json({message:'HOLA MUNDO'});
});

app.get('/libros', (req, res) => {

    const {genre}= req.query
    if (genre){
        const filteredBooks= libros.filter( 
            libro => libro.genre.some(g=>g.toLowerCase()===genre.toLowerCase())
        )
        return res.json(filteredBooks) //devuelvo esos libros

    }

    res.json(libros);

});

app.post('/libros', (req, res) => {

    //en el  caso de que lo vaya a levantar en una pag/dominio tendria que mandarle las cabeceras para que ese dominio tenga "acceso a la api" y para no tener problema de CORS
    // res.header('Access-Control-Allow-Origin', '*');
    // res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    // res.header('Access-Control-Allow-Headers', 'Content-Type');
    // res.header('Access-Control-Allow-Credentials', true);


    const result = validateBook(req.body)
    if (result.error) {
        return res.status(400).json(result.error);
    }
    
    const newBook={
        id: crypto.randomUUID(),
        ...result.data
    }
    libros.push(newBook);
    res.status(201).json(newBook);

})

app.patch('/libros/:id', (req, res) => {
    const result = validatePartialBook(req.body)

    if(!result.success){
        return res.status(400).json(result.error)
    }

    const {id} = req.params;
    const libroIndex = libros.findIndex(libro => libro.id === id);

    if (libroIndex === -1) {
        return res.status(404).json({ message: 'Libro no encontrado' });
    }

    const libroActualizado = {
        ...libros[libroIndex],
        ...result.data
    }

    libros[libroIndex] = libroActualizado;
    res.json(libroActualizado);


})




app.get('/libros/:id', (req, res) => {
    const id = req.params.id;
    const libro = libros.find(libro => libro.id === id);
    if (!libro) {
        return res.status(404).json({ message: 'Libro no encontrado' });
    }
    res.json(libro);
})




const PORT = process.env.PORT || 1234;

app.listen(PORT,()=>{
    console.log('Servidor corriendo en el puerto: http://localhost:'+PORT)
})