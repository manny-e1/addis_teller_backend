import express from 'express'
import { baseRoute } from '../controllers/baseRouteController.js'

const router = express.Router()

router.route('/').get(baseRoute)

export default router