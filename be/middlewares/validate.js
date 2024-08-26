const validate=require('../utils')

const fetchUserData=(req,res,next)=>{
    const {initData}=req.query
    if(!initData){
        res.status(401).send({error:"Please authenticate using a valid token"})
    }
    try{
        const isValid=validate(initData)
        if(isValid){
            const urlParams = new URLSearchParams(initData);
            const userData = {};
            for (let [key, value] of urlParams.entries()) {
              userData[key] = value;
            }
            const user = JSON.parse(userData.user);
            req.id=user.id
            next()
        }else{
            res.status(400).send({error:"Data is not valid"})
        }
    }catch(err){
        console.log(err)
        res.status(400).send({error:"Data is not valid"})
    }}
module.exports=fetchUserData
