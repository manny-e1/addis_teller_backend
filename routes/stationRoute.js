import express from 'express'
import { addStation, getStations, updateStation, getStation, removeDestinationStation, searchst, nearby, deleteStation} from '../controllers/stationcontrollers.js'
import isAuthenticated from '../middlewares/authentication.js'
import isAdmin from '../middlewares/isAdmin.js'

const router = express.Router()

router.route('/').post(addStation).get(getStations)
router.route('/:id').delete(deleteStation).put(updateStation).get(isAuthenticated, getStation)
router.route('/:stationID/:destinationID').delete(isAuthenticated, removeDestinationStation)
router.route('/search/:search').get(searchst)
router.route('/nearby/:nearbyCoordinate').get(nearby)

export default router