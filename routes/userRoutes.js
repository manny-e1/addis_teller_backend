import express from 'express'
import { userRegister, userLogin, getUsers, updateUserById, updateUser, deleteUser, getUserByID } from '../controllers/userControllers.js'
import isAuthenticated from '../middlewares/authentication.js'
import isAdmin from '../middlewares/isAdmin.js'

const router = express.Router()

router.route('/register').post(userRegister)
router.route('/login').post(userLogin)
router.route('/update').put(isAuthenticated,updateUser)
router.route('/').get(isAuthenticated, isAdmin,getUsers)
router.route('/:id').delete(isAuthenticated, deleteUser).get(isAuthenticated, getUserByID).put(isAuthenticated, isAdmin, updateUserById)


export default router