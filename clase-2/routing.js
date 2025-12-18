const http = require('node:http')

const dittoJSON= require ('./pokemon/ditto.json')
const { stringify } = require('node:querystring')

const processRequest = (req, res) => {
    const {method, url} = req

    switch(method){
        case 'GET':
            switch(url){
                case '/pokemon/ditto':
                    res.statusCode = 200
                    res.setHeader('Content-Type', 'application/json; charset=utf-8')
                    return res.end(JSON.stringify(dittoJSON))
                case '/':
                    res.statusCode = 200
                    res.setHeader('Content-Type', 'text/html; charset=utf-8')
                    return res.end('<h1>Mi página web</h1>')
                default:
                    res.statusCode = 404
                    res.setHeader('Content-Type', 'text/html; charset=utf-8')
                    return res.end('<h1>404 Not Found</h1>>')
            }
        case 'POST':
            switch(url){
                case '/pokemon':{
                    let body = ''

                    req.on('data', chunk => {
                        body += chunk.toString()
                    })

                    req.on('end', () => { //me fijo cuando llega el evento de que termino
                        const data = JSON.parse(body)
                        res.writeHead(201, {
                            'Content-Type': 'application/json; charset=utf-8'
                        })
                        data.timestamp = Date.now()
                        res.end(JSON.stringify(data))
                    })
                    break;

                }
                default:
                    res.statusCode = 404
                    res.setHeader('Content-Type', 'text/html; charset=utf-8')
                    return res.end('<h1>404 Not Found</h1>>')
            }
    } 
}

const server = http.createServer(processRequest)

server.listen(1234,()=>{
    console.log('server listening on http://localhost:1234')
})