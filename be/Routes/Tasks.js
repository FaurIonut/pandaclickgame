const express=require('express')
const router=express.Router()
const validate=require('../middlewares/validate')
const TaskModel=require('../Models/TasksModel')
const ResourceModel=require('../Models/ResourcesModel')
const DailyRewardsModel=require('../Models/DailyRewardsModel')

router.post('/complete',validate,async(req,res)=>{
    const id=req.id
    const taskId=req.query.taskId
    const task=await TaskModel.findOne({id})
    const resource=await ResourceModel.findOne({id})
    for(let i=0;i<task.tasks.length;i++){
        console.log(task.tasks[i].id+" -- "+taskId)
        if(task.tasks[i].id==taskId){

            if(!task.tasks[i].completed){
                task.tasks[i].completed=true
                resource.tokens+=task.tasks[i].reward
                await task.save()
                await resource.save()
                console.log(task.tasks[i].completed)
                res.json({message:"Task completed successfully"})
            }else{
                res.json({message:"Task already completed"})
            }
            break;
        }
    }
})

router.post('/',validate,async(req,res)=>{
    const id=req.id
    const task=await TaskModel.findOne({id})
    const dailyReward=await DailyRewardsModel.findOne({id})
    if(dailyReward?.details[6].claimed){
        for(let i=0;i<7;i++){
            dailyReward.details[i].claimed=false
        }
    await dailyReward.save()
    }
    res.json({task,dailyReward})
})


router.post('/claim',validate,async(req,res)=>{
    const id=req.id
    const dailyReward=await DailyRewardsModel.findOne({id})
    const resource=await ResourceModel.findOne({id})
    if(dailyReward){
        if(!dailyReward.details[0].claimed){
            dailyReward.details[0].claimed=true
            resource.tokens+=dailyReward.details[0].reward
            dailyReward.details[0].time=new Date()
            dailyReward.save()
            res.json({dailyReward})
        }else{
            const currentTime=new Date()
            let lastClaimed=0;
            for(let i=0;i<dailyReward.details.length;i++){
                if(dailyReward.details[i].claimed){
                    lastClaimed=i
                }
            }
            console.log(lastClaimed);
            console.log(dailyReward.details[0].time)
            if(dailyReward.details[(lastClaimed+1)%7].time>currentTime){
                res.json({message:"Already claimed"})
            }else{
                dailyReward.details[(lastClaimed+1)%7].claimed=true
                resource.tokens+=dailyReward.details[(lastClaimed+1)%7].reward
                dailyReward.details[(lastClaimed+1)%7].time=currentTime
                dailyReward.save()
                res.json({dailyReward})
            }
        }
        await resource.save()
    }

})
module.exports=router