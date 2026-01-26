//aca lo que voy a hacer es que depende lo que quiera usar ejecuto un archivo o otro, 
//esto es para hacer las inyecciones de dependencia desde lo mas afuera posible

import { createApp } from './app.js'

import {MovieModel} from './models/database/mysql/movie.js' //aca importo el modelo que quiero usar

createApp({ movieModel: MovieModel})