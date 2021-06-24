import asyncHandler from 'express-async-handler'
import Post from '../models/postModel.js'
import Station from '../models/stationModel.js'


export const addPost = asyncHandler(async (req, res) => {
    const { body } = req.body
    const { stationID } = req.params
    try {
        const createdPost = await Post.create({
            user: req.user.id,
            body: body,
            station: stationID,
        })
        const fetchCreatePost = await Post.findById(createdPost._id).populate('user')
        const station = await Station.findById(stationID)
        station.posts.push(createdPost._id)
        await station.save()
        res.status(201).json(fetchCreatePost)
    } catch (error) {
        res.status(400)
        console.log(error);
        throw new Error("Error creating Post")

    }
})


export const getPosts = asyncHandler(async (req, res) => {
    try {
        // const pageNumber = req.query.pageNumber ? parseInt(req.query.pageNumber) : 1
        // const pagination = req.query.pagination ? parseInt(req.query.pagination) : 10

        const posts = await Post.find().populate('user')
        console.log("here")
        res.status(200).json(posts)
    } catch (error) {
        console.log(error);
        res.status(400)
        throw new Error('Error retrieving posts')
    }

})

export const getPostByStationID = asyncHandler(async (req,res) => {
    try {
        const posts = await Post.find({station: req.params.stationID}).populate('user')
        console.log("here");
        console.log(posts);
        res.status(200).json(posts)
    } catch (error) {
        console.log(error);
        res.status(400)
        throw new Error('Error retrieving posts')
    }

})


export const updatePost = asyncHandler(async (req, res) => {
    try {
        console.log("updating");
        console.log(`id: ${req.params.id} and body: ${req.body.body}`)
        const post = await Post.findById(req.params.id)
        post.body = req.body.body ? req.body.body : post.body
        console.log("updating done");
        await post.save()
        res.status(200).json(post)
    } catch (error) {
        console.log(error);
        res.status(400)
        throw new Error('Error updating post')
    }

})

export const deletePost = asyncHandler(async (req,res) =>{
    try {
        const deletedPost = await Post.findByIdAndDelete(req.params.id)
        res.status(204).json(deletedPost)
    } catch (error) {
            res.json(error)
    }
})
