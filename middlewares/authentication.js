import jwt from 'jsonwebtoken'
import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

const isAuthenticated = asyncHandler( async (req,res,next) => {
    let token 
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            token = req.headers.authorization.split(' ')[1]
            const {id} = jwt.verify(token, process.env.SECRET_KEY)
            const currentUser = await User.findById(id).select("_id name email")
            req.user = currentUser
            next()
        } catch (error) {
            console.error(error)
            res.status(401)
            throw new Error('Not Authorized')
        }
    }
    if (!token) {
        res.status(401)
        throw new Error('Not authorized, no token')
      }
})

export default isAuthenticated