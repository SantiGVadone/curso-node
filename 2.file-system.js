
// //fs es file system
// const fs= require('node:fs')


// //ESTA ES UNA FORMA DE HACER TODO DE FORMA SINCRONA (Sync) OSEA LINEA A LINEA
// const stats = fs.statSync('./archivo.txt')

// const text = fs.readFileSync('./archivo.txt', 'utf-8')

// console.log(
//     'Texto: \n', text,
//     '\nEs una archivo: \n' ,stats.isFile(),
//     '\nEs un directorio: \n', stats.isDirectory(),
//     '\nEs un enlace simbolico: \n',stats.isSymbolicLink(),
//     '\nTamaño: \n', stats.size, 'MB',
// )

//ESTA ES LA FORMA DE HACER TODO DE FORMA ASINCRONCA

const fs= require('node:fs')
console.log('Leyendo el archivo')
//si es readfile sin el (Sync) entonces te acepta un parametro mas, para saber 
//cuando termino de leer
fs.readFile('./archivo.txt', 'utf-8', (err, text) => {
  console.log(text)
})
console.log('\n\n\nEsto Esta una linea DESPUES que el readfile\n\n\n')   //imprimio primero el console.log y despues imprimio el archivo cuando lo termino de leer