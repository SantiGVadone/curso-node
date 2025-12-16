const fs = require('node:fs/promises')
const path = require('node:path')

const folder = process.argv[2] ?? '.' //el segundo arg seria el primer valor que yo le escribo APARTE DEL NOMBRE 

async function ls(folder){
    let files
    try{
        files = await fs.readdir(folder)
    } catch{
        console.error(' No se pudo leer el direcctorio${folder}')
        process.exit(1)
    }
    const filePromises = files.map(async file=>{
        const filePath=path.join(folder,file)
        let stats
        try{
            stats = await fs.stat(filePath) //stat te da la info del archivo
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