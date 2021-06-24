import asyncHandler from 'express-async-handler'
import Station from '../models/stationModel.js'
import { calcrow } from '../utils/nearbyCalc.js'

export const addStation = asyncHandler(async (req,res) => {
    const { name, latLong} = req.body
    const posts = req.body.posts ? req.body.posts : []
    const stations = req.body.stations ? req.body.stations : []

    try {
        const createdStation = await Station.create({
            name,
            latLong,
            stations,
            posts
        })
        res.status(201).json(createdStation)
    } catch (error) {
        res.status(400)
        throw new Error("Error creating station")

    }
})

export const getStations = asyncHandler(async (req, res) => {
    try {
        const stations = await Station.find()
            .populate({path: 'posts',populate:{path:'posts',model:'Post'}})
            .populate({path: 'stations',populate:{path:'stations',model:'Station'}})
        res.status(200).json(stations)
    } catch (error) {
        res.status(403)
        throw new Error('Error retrieving stations')
    }

})

export const getStation = asyncHandler( async (req,res) => {
    try {
        const station = await Station.findById(req.params.id)
        res.status(200).json(station)


    } catch (error) {
        res.status(404)
        throw new Error('station not found')
    }
})

export const searchst = asyncHandler( async (req,res) => {
    try {
        const searchResult = await Station.find({$text: {$search: req.params.search}}).select('name latLong')
        const newResult = searchResult.map((station )=>{return  {"station": station}})
        console.log(newResult);
        res.json(newResult)
    } catch (error) {
        res.json(error.message)
    }
})

export const nearby = asyncHandler( async (req,res) => {
    const { nearbyCoordinate } = req.params

    console.log("nearby station");
    try {
        const stations = await Station.find()
        const newStations = []
        stations.forEach(station => {
            const stationLatLong = station.latLong.split(',')
            const nearbylatLong = nearbyCoordinate.split(',')
            const stationLat = parseFloat(stationLatLong[0])
            const stationLong = parseFloat(stationLatLong[1])
            if (calcrow(nearbylatLong[0], nearbylatLong[1], stationLat, stationLong) <10){
                
                newStations.push({station,distance:calcrow(nearbylatLong[0], nearbylatLong[1], stationLat, stationLong)})
            }
        }) 
        console.log("nearby statioin end");
        res.status(200).json(newStations)
    } catch (error) {
        console.log(error);
        res.json(error.message)
    }
})


export const updateStation = asyncHandler( async (req,res) => {
    try {
        const station = await Station.findById(req.params.id)
        
        station.name = req.body.name ? req.body.name : station.name
        station.latLong = req.body.latLong ? req.body.latLong : station.latLong
        // if (req.body.posts){
        //     station.posts.push(req.body.posts)
        // }
        // console.log(`kelay ${req.body.stations}`);
        if (req.body.stations){
            req.body.stations.forEach( asyncHandler(async (updStation)=> {
                try {
                    const destination = await Station.findById(updStation)
                    if (!destination){
                        res.status(404)
                        throw new Error(`destination ${destination.name} not found`)
                    }
                    const isAlreadyThere = station.stations.some((destStation) => {
                        return destination.id == destStation
                    })
                    // console.log(isAlreadyThere);
                    if (isAlreadyThere){
                        res.status(403)
                        throw new Error(`destination '${destination.name},' already in the list`)
                    }
                    station.stations.push(updStation)
                    // await station.save()
                } catch (error) {
                    console.log(error)
                }
            }))
                              
        }
        console.log(station.stations);
        await station.save()
        res.status(200).json(station)


    } catch (error) {
        res.status(404)
        console.log(error);
        throw new Error(error.message)
    }
})

export const removeDestinationStation = asyncHandler( async (req,res) => {
    try {
        const station = await Station.findById(req.params.stationID)
        const destStationIndex = station.stations.findIndex(
            destination =>  destination == req.params.destinationID )
          
        if (destStationIndex === -1) {
            throw new Error('destination not found in the station')
        }

        station.stations.splice(destStationIndex, 1);
        await station.save();
        res.json(station)


    } catch (error) {
        console.log(error);
        res.status(404)
        throw new Error(error.message)
    }
})

export const deleteStation = asyncHandler(async (req,res) =>{
console.log("here");	
    try {
        const deletedStation = await Station.findByIdAndDelete(req.params.id)
        console.log("done");
        res.status(204).json(deletedStation)
    } catch (error) {
            res.json(error)
    }
})
