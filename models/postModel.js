import mongoose from 'mongoose'
import ttl from 'mongoose-ttl'

const postSchema = mongoose.Schema({
    body: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    station: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Station',
        required: true,
    },
    expireAt: {
        type: Date,
        default: Date.now,
        index: {
            expires: '59m'
        }
    }
},{
    timestamps: true,
})

// postSchema.plugin(ttl, { ttl: 60000 });


const Post = mongoose.model('Post', postSchema)

export default Post