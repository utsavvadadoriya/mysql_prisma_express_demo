import express from 'express'
import { addUser, deleteUser, getUserProfile, updateUser } from '../controller/user.js'

const userRoutes = express.Router()
userRoutes.post('/', addUser)
userRoutes.get('/', getUserProfile)
userRoutes.put('/', updateUser)
userRoutes.delete('/', deleteUser)

export default userRoutes
