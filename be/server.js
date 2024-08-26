const TasksModel=require('./Models/TasksModel')
const connect=require('./db')
connect();

const add=async()=>{
    
const tasks=new TasksModel({
    id:"1",
    task:"Join our Telegram channel",
    url:"https://t.me/abc",
    completed:false,
    reward:100
})
await tasks.save()
const tasks1=new TasksModel({
    id:"2",
    task:"Follow us on Twitter",
    url:"https://twitter.com/abc",
    completed:false,
    reward:180
})
await tasks1.save()
const tasks2=new TasksModel({
    id:"3",
    task:"Subscribe to our Youtube channel",
    url:"https://youtube.com/abc",
    completed:false,
    reward:125
})
await tasks2.save()
const tasks3=new TasksModel({
    id:"4",
    task:"Join our telegram community channel",
    url:"https://instagram.com/abc",
    completed:false,
    reward:150
})
await tasks3.save()
}

add()