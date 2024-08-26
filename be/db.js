const mongoose=require('mongoose');
require('dotenv').config();
const uri=process.env.ATLAS_URI;

const connect=()=>{
    mongoose.connect(uri);
    const connection=mongoose.connection;
    connection.once('open',()=>{
        console.log("MongoDB database connection established successfully");
    });
}
module.exports=connect;