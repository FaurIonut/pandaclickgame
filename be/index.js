const express=require('express')
const app=express()
const port=5000
const cors=require('cors')
const connect=require('./db')
connect()
require('dotenv').config()
app.use(cors())
app.use(express.json())
app.use("/validate",require('./Routes/validate'))
app.use("/boosters",require('./Routes/Boosters'))
app.use("/referral",require('./Routes/Referral'))
app.use("/update",require('./Routes/Update'))
app.use("/tasks",require('./Routes/Tasks'))


app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})


