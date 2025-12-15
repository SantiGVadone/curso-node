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