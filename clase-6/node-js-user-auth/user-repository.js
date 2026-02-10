import crypto from 'node:crypto'

import DBLocal from 'db-local'
import bcrypt from 'bcrypt'

import { SALT_ROUNDS } from './config.js'

const { Schema } = new DBLocal({ path: './db' })

const User = Schema('User', {
  _id: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true }
})

export class UserRepository {
  static async create ({ username, password }) {
    // 1. Validaciones de Username (opcional usar zod) y password
    if (typeof username !== 'string') {
      throw new Error('User name must be a string')
    }
    if (typeof password !== 'string') {
      throw new Error('Password must be a string')
    }
    // hash de la password
    const hashedPassword = await bcrypt.hashSync(password, SALT_ROUNDS) // el 10 es un numero que genera un pass codificado en base al numero ese
    //                            hashSync blockea el thread principal asi que es mejor hacer un async await

    // 2. Validar que el username no existe
    if (User.findOne({ username })) {
      throw new Error('Username already exists')
    }
    // 3. Crear el usuario
    const id = crypto.randomUUID()
    User.create({
      _id: id,
      username,
      password: hashedPassword
    }).save()
    return id
  }

  static login ({ username, password }) {}
}
