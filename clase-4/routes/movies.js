import { Router } from "express";

import { MoviesController } from "../controllers/movies.js";

export const moviesRouter = Router()

moviesRouter.get('/', MoviesController.getAll)
moviesRouter.post('/', MoviesController.create)

moviesRouter.get('/:id', MoviesController.getById) //esto se conoce como path-to-regexp 

moviesRouter.delete('/:id', MoviesController.delete)

moviesRouter.patch('/:id', MoviesController.update)
