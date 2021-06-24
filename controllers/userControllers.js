import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'


export const userRegister = asyncHandler(async (req,res) =>{
    const { name, email, password } = req.body
    const isAdmin = req.body.isAdmin ? req.body.isAdmin : false
    try {
        const userExists = await User.findOne({email})
        if(userExists){
            res.status(400)
            throw new Error('User already exists')
        }
        const user = await User.create({
            name,
            email,
            password,
            isAdmin
        })
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
        })
    } catch (error) {
        res.json({
            message: error.message
        })
    }
})

export const userLogin = asyncHandler(async (req,res) =>{
    const {email,password} = req.body
    const user = await User.findOne({email})
    if (user && (await user.matchPassword(password))){
        console.log(req.body)
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(
                user._id,
                ),
        })
    }else{
        res.status(401)
        throw new Error('Invalid Email or Password')
    }
})


export const getUserByID = asyncHandler(async (req,res)=>{
    try {
        const user = await User.findById(req.params.id).select("_id name email isAdmin")
        res.status(200).json(user)
    } catch (error) {
        res.status(404)
        throw new Error('Error retriving users!')
    }
})


export const getUsers = asyncHandler(async (req,res) =>{
    try {
        const users = await User.find().select("_id name email isAdmin")
        res.status(200).json(users)
    } catch (error) {
        res.status(404)
        throw new Error('Error retriving users!')
    }
})

export const updateUserById = asyncHandler(async (req,res) =>{
    try {
        const {id} = req.params
        const {name,email} = req.body
        const user = await User.findById(id)
        user.name = name77890
        user.email = email
        user.password = req.body.password || user.password
        user.isAdmin = req.body.isAdmin || user.isAdmin
        await user.save()
        res.status(200).json(user)
    } catch (error) {
        res.status(404)
        throw new Error('User not found!')
    }
})

export const updateUser = asyncHandler(async (req,res) =>{
    try {
        console.log("hi");
        const user = await User.findById(req.user._id)
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.password = req.body.password || user.password
        user.isAdmin = req.body.isAdmin || user.isAdmin
        if(req.body.password){
            user.password = req.body.password
        }
        console.log("updating")
        const updatedUser = await user.save()
        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
        })
    } catch (error) {
        res.json(error)
    }
})

export const deleteUser = asyncHandler(async (req,res) =>{
    try {
        console.log("deleting")
        const deletedUser = await User.findByIdAndDelete(req.params.id)
        console.log("done deleting");
        res.status(204).json(deletedUser)
    } catch (error) {
        console.log(error);
            res.json(error.message)
    }
})