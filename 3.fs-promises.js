
const fs= require('node:fs/promises')

console.log('Leyendo el archivo')
//al ser node:fs/promises
//aceptamos promesas osea que puedo poner esto
fs.readFile('./archivo.txt', 'utf-8')
  .then( text => {
    console.log(text)
  })
  .catch( err => {
    console.log(err)
  })

console.log('\n\n\nEsto Esta una linea DESPUES que el readfile\n\n\n')