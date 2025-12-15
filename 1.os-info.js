//estos son imports "defaults" podes importar cosas como datos del os
import { type, release, arch, uptime, totalmem, freemem, cpus } from 'node:os'

console.log('Infromacion del Sistema Operativo')
console.log('-----------------------------------')
console.log('Nombre del sistema')
console.log(type())
console.log('Version del sistema')
console.log(release())
console.log('Arquitectura del sistema')
console.log(arch())
console.log('Tiempo de Encendido')
console.log(uptime()/60/60) // me lo da en seg asi qeu lo divido para tener las horas
console.log('Memoria Total')
console.log(totalmem()/1024/1024)  //como me da la memoria en bytes lo divido para tener gb
console.log('Memoria Libre')
console.log(freemem()/1024/1024)
console.log('Cantidad de procesadores')
console.log(cpus().length) //el .lenght() cuenta la cantidad de cpus
console.log('-----------------------------------')



/* ESTA ES OTRA FORMA DE HACERLO UNA CON IMPORT Y LA OTRA CON CONST REQUIRE
const os= require('node:os')

console.log('Infromacion del Sistema Operativo')
console.log('-----------------------------------')
console.log('Nombre del sistema')
console.log(os.type())
console.log('Version del sistema')
console.log(os.release())
console.log('Arquitectura del sistema')
console.log(os.arch())
console.log('Tiempo de Encendido')
console.log(os.uptime()/60/60) // me lo da en seg asi qeu lo divido para tener las horas
console.log('Memoria Total')
console.log(os.totalmem()/1024/1024)  //como me da la memoria en bytes lo divido para tener gb
console.log('Memoria Libre')
console.log(os.freemem()/1024/1024)
console.log('Cantidad de procesadores')
console.log(os.cpus().length) //el .lenght() cuenta la cantidad de cpus
console.log('-----------------------------------')


 */