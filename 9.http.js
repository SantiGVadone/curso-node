const http= require('node:http')

const server = http.createServer((req,res) => {
    console.log('Solicitud entrante')
    res.end('Hola Mundo')
})

server.listen(0, () => { //se pone 0 para que agarre el primer puerto vacio, 
                        // es recomendable solo para modo desarollo 
                        // en produccion es mejor que se sepa en que puerto va a estar y eso
    console.log( `Servidor escuchando en el puerto http://localhost:${server.address().port}` )
})
