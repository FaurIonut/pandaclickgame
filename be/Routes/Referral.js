const router = require('express').Router();
const validate = require('../middlewares/validate');
const UserModels = require('../Models/UserModel');
const ReferralModel = require('../Models/ReferralModel');
const ResourceModel = require('../Models/ResourcesModel');

router.post('/refer', validate,(req, res) => {
    const id=req.id;
    const referredId=req.query.referredId;
    const referredUser=ReferralModel.findOne({id:referredId});
    if(referredUser){
        const obj={
            id:id,
            name:UserModels.findOne({id:id}).name
        
        }
        referredUser.referred.push(obj);
        referredUser.save();
        const user=ResourceModel.findOne({id:id});
        user.tokens+=100;
        user.save();
    }
    else{
        res.send('User not found');
    }

})

router.post('/getReferrals',validate,async (req,res)=>{
    const id=req.id;
    const user=await ReferralModel.findOne({id:id});
    console.log(user);
    if(user){
        res.send(user.referred);
    }
    else{
        res.send('User not found');
    }
})

module.exports = router;