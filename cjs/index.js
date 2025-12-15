// console.log('Hola, mundo')
// console.info('Este mensaje es de informacion')
// console.error('Este es un mensaje de error')

// console.log(globalThis)  // globalThis es una variable GLOBAL en toda la app

// function sum (a,b){ //asi se define la funcion
//     return a+b
// }

// const a = sum(2,3) //asi se define una variable/constante

// //puede ser de las 2 formas estas
// console.log(a)
// console.log(sum(2,3))

//ahora vamos a importar algun modulo o funcion de otro archivo llamado sum.js

//commonJS require import
const {sum }= require('./sum')

console.log(sum(2,3))

//