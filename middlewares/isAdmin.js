import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

const isAdmin = asyncHandler( async (req,res,next) => {
        try {
            const currentUser = await User.findById(req.user._id)
            console.log(currentUser)
            if(currentUser.isAdmin){
                next()
            }else { 
                throw new Error("No authorized as an admin")
            }
        } catch (error) {
            res.status(401)
            throw new Error(error.message)
        }
})

export default isAdmin