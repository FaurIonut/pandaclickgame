const mg=require('mongoose');
const ResourceSchema = new mg.Schema({
    id: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    tokens: {
        type: Number,
        required: true,
        trim: true
    },
    bots: {
        type: Number,
        required: true,
        trim: true
    },
    tapSize: {
        type: Number,
        required: true,
        trim: true
    },
    tapLimit: {
        type: Number,
        required: true,
        trim: true
    },
    lastCheckin:{
        type: Date,
        required: true,
        trim: true
    },
    tapsAvailable:{
        type:Number,
        required:true,
        trim:true
    },
    lastTap:{
        type:Date,
        required:true,
        trim:true
    }
});
const ResourceModel = mg.model('Resource', ResourceSchema);
module.exports = ResourceModel;