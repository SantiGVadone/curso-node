//argumentos de entrada
console.log(process.argv)
//es como cuando le das comandos al main por el cmd en C++

// controlar el proceso y su salida
//process.exit(0)

//controlar eventos 
process.on('exit',()=>{
    //limpiar los recursos
})

//current working directory
console.log(process.cwd())//esto dice DESDE DONDE SE EJECUTA EL ARCHIVO 

