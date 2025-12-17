console.log(`vamos a estar usando math.js y algunos modulos de node`)

const {suma} = require (`./math.js`)

const resultado = suma(3,2)

console.log(resultado)


console.log(`Vamos a hacer un read file`)

const fs = require(`node:fs`)

const text = fs.readFileSync(`./archivo1.txt`,`utf-8`)

console.log(text,'\n\n')

console.log('Ahora vamos a hacer un read file con promesa')

const fsp = require(`node:fs/promises`)

fsp.readFile(`./archivo1.txt`,`utf-8`).then((text)=>{
    console.log(text)
}).catch((err)=>{
    console.log(err)
})


console.log('Ahora vamos a hacer un read file con promesas EN PARALELO DE ESTA FORMA PUEDO ELEGIR EL ORDEN DE IMPRESION')

Promise.all([
    fsp.readFile(`./archivo1.txt`,`utf-8`),
    fsp.readFile(`./archivo2.txt`,`utf-8`)
]).then(([text1,text2])=>{
    console.log(text1,'\n\n\n',text2)
})

//VAMOS A VER COMO SON ALGUNAS FUNCIONES PARA TRABAJAR CON EL PATH
const path = require('node:path')

//Barra separadora de carpetas segun SO
console.log(path.sep)

//unir rutas con path.join
const ruta = path.join('.', 'content','subfolder','test.txt')
console.log(ruta)

//basename te da el ultimo fichero por asi decirlo
const base = path.basename('/tmp/secret-files/password.txt')
console.log(base)

//el basename te da el nombre, si le decis que saque la extension
const nombre = path.basename('/tmp/secret-files/password.txt' , '.txt')
console.log(nombre)

//para tener la extencion puedo usar .extname
const extension = path.extname('/tmp/secret-files/password.txt')
console.log(extension)


//UN EJERCICIO DONDE SE USA LAS DOS COSAS QUE VIMOS RECIEN PARA PODER HACER UN LS O UN DIR

const folder = process.argv[2] ?? '.' //el segundo arg seria el primer valor que yo le escribo APARTE DEL NOMBRE 

async function ls(folder){
    let files
    try{
        files = await fsp.readdir(folder)
    } catch{
        console.error(' No se pudo leer el direcctorio${folder}')
        process.exit(1)
    }
    const filePromises = files.map(async file=>{
        const filePath=path.join(folder,file)
        let stats
        try{
            stats = await fsp.stat(filePath) //stat te da la info del archivo
        } catch{
            console.error('No se pudo leer el archivo ${filePath}')
            process.exit(1)
        }

        const isDirectory=stats.isDirectory()
        const fileType = isDirectory ? 'd' : 'f'
        const fileSize = stats.size
        const fileModified = stats.mtime.toLocaleString()

        return `${fileType} ${file.padEnd(30)} ${fileSize.toString().padStart(10)} ${fileModified} ${file}` 
    })

const filesInfo = await Promise.all(filePromises)

    filesInfo.forEach(fileInfo=>console.log(fileInfo))
}

ls(folder)



//ASI SE PUEDE LEVANTAR UN SERVIDOR FACIL Y SENCILLO 
const http= require('node:http')

const server = http.createServer((req,res) => {
    console.log('Solicitud entrante')
    res.end('Hola Mundo')
})

server.listen(0, () => { //se pone 0 para que agarre el primer puerto vacio, 
                        // es recomendable solo para modo desarollo 
                        // en produccion es mejor que se sepa en que puerto va a estar y eso
    console.log( `Servidor escuchando en el puerto http://localhost:${server.address().port}` )//IMPRIMO EL PUERTO YA QUE NO SE CUAL ES EL QUE ENCONTRO
})

