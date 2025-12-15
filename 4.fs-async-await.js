// //esto estaria mal y se puede arreglar de dos formas
// const fs= require('node:fs/promises')

// console.log('Leyendo el archivo')
// const text = await fs.readFile('./archivo.txt', 'utf-8')
// console.log(text)


//una es con modulos y poniendo .mjs osea que seria con import en ves de require
// yyyy la otra es con una funcion async que se auto invoque
//ya que este error es porque dice que no puede haber un await fuera del asyc
//seria algo asi 
const fs = require('node:fs/promises')

//ESTO ES UNA FUNCION QUE SE ESTA AUTOINVOCANDO
;( //hay que poner el ; sino piens aque lo anterior es la funcion
async()=>{
    console.log('Leyendo el archivo')
    const text = await fs.readFile('./archivo.txt', 'utf-8')
    console.log('Primer Texto',text)
}
)()

console.log('\n\n\nEsto Esta una linea DESPUES que el readfile con await\n\n\n')
