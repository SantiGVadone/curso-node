const http =require('node:http')
//const { buscarPuerto } = require('./puerto-libre')
//por ahora vamos a hacer todo en el mismo puerto asi es mas facil
/*
STATUS CODE
100-199 RESPUESTAS INFORMATIVAS 
200-299 RESPUESTAS SATIFACTORIAS
300-399 REDIRECCIONES
400-499 ERRORES DEL CLIENTE
500-599 ERRORES DEL SERVIDOR

200 es el OK
301 es el REDIRECCIONES PERMANENTES
400 es el BAD REQUEST
404 es el NOT FOUD
500 es el INTERNAL SERVER ERROR
*/



const processRequest = (req, res) => {
    console.log('request received')//aca obviamente va la respuesta que le damos al sv / usuario
    if(req.url === '/'){
        res.satusCode = 200 //significa que esta todo bien
        res.setHeader('Content-Type', 'text/html ; charset=utf-8')
        res.end('<h1>Mi página web</h1>')
    }else if(req.url === '/contacto'){
        res.satusCode = 200 //el estatusCode 200 es el por defecto
        res.setHeader('Content-Type', 'text/html ; charset=utf-8')
        res.end('<h1>Mi página de web de contacto</h1>')
    } else{
        res.statusCode = 404
        res.setHeader('Content-Type', 'text/html ; charset=utf-8')
        res.end('<h1>404</h1>')
    }
}

const server = http.createServer(processRequest)
const port = process.env.PORT ?? 3000

//buscarPuerto(0).then(port =>{
    server.listen(port, ()=>{ 
        console.log(`server listening on port http://localhost:${port}`)
    })
//})


//ME QUEDE EN EL MINUTO 40 DEL VIDEO {LOS METODOS} {CREANDO LA PRIMERA API}