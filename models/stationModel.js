import mongoose from 'mongoose'

const stationSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    latLong: {
        type:String,
        required:true
    },
    stations: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Station',
            required: true
        }
    ],
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Post',
            required: true
        }
    ]
},{
    timestamps: true,
})

stationSchema.index({name: 'text', latLong: 'text'})


const Station = mongoose.model('Station', stationSchema)

export default Station