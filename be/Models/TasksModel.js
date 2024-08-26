const mg=require('mongoose');

const TaskSchema = new mg.Schema({
    id: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    tasks:[{
        task:{
            type:String,
            required:true
        },url:{
            type:String,
            required:true
        },
        reward:{
            type:Number,
            required:true
        },
        completed:{
            type:Boolean,
            default:false
        }
    }]
});

const TasksModel = mg.model('Task', TaskSchema);
module.exports = TasksModel;