import express from 'express'
import { addPost, deletePost, getPostByStationID, getPosts, updatePost} from '../controllers/postControllers.js'
import isAuthenticated from '../middlewares/authentication.js'

const router = express.Router()

router.route('/:stationID').post(isAuthenticated, addPost).get(isAuthenticated, getPostByStationID)
router.route('/').get(isAuthenticated,getPosts)
router.route('/:id').delete(isAuthenticated, deletePost).put(updatePost)
export default router
