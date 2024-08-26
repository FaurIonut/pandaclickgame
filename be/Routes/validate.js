const express = require('express')
const router = express.Router()
const validate = require('../utils')
const UserModels = require('../Models/UserModel')
const ResourceModel = require('../Models/ResourcesModel')
const ReferralModel = require('../Models/ReferralModel')
const TasksModel = require('../Models/TasksModel')
const DailyRewardsModel = require('../Models/DailyRewardsModel')

router.post('/', async (req, res) => {
  const { initData } = req.query
  try {
    const isValid = validate(initData)
    if (isValid) {
      const urlParams = new URLSearchParams(initData);
      const userData = {};
      for (let [key, value] of urlParams.entries()) {
        userData[key] = value;
      }
      const userDet = JSON.parse(userData.user);
      const user = await UserModels.findOne({ id: userDet.id });
      if (user) {
        const resource = await ResourceModel.findOne({ id: userDet.id });
        const currentTime = new Date();
        const lastTapTime = new Date(resource.lastTap);
        const diffInSeconds = Math.floor((currentTime - lastTapTime) / 1000);
        const maxTaps = resource.tapLimit;
        const newTapsAvailable = Math.min(resource.tapsAvailable + diffInSeconds, maxTaps);
        await resource.save();
        resource.tapsAvailable = newTapsAvailable;
        resource.lastTap = currentTime;
        const lastCheckin = new Date(resource.lastCheckin);
        let diff = Math.floor((currentTime - lastCheckin) / 1000);
        if(diff>=10800){
          diff=10800;
        }
        res.json({ resource,collectables:resource.bots * diff });
        console.log(lastCheckin);
        resource.tokens += resource.bots * diff;
        resource.lastCheckin=currentTime;
        await resource.save();
        return;
      } else {
        const newUser = new UserModels({
          name: userDet.first_name + ' ' + userDet.last_name,
          id: userDet.id,
          language: userDet.language_code,
        });
        const {refer}=req.query
        if(refer){
          const referrer=await ReferralModel.findOne({id:refer})
          if(referrer){
            const obj={
              id:userDet.id,
              name:userDet.first_name + ' ' + userDet.last_name
            }
            const addResource=await ResourceModel.findOne({id:refer})
            addResource.tokens+=100
            await addResource.save()
            referrer.referred.push(obj)
            await referrer.save()
          }
        }
        newUser.save();
        const newResource = new ResourceModel({
          id: userDet.id,
          tokens: 0,
          bots: 0,
          tapSize: 1,
          tapLimit: 50,
          lastCheckin: new Date(),
          tapsAvailable: 50,
          lastTap: new Date(),
        });
        await newResource.save();
        const newReferral = new ReferralModel({
          id: userDet.id,
          referred: [],
        });
        newReferral.save();
        const tasks = new TasksModel({
          id:userDet.id,
          tasks:[
            {
              task: "Join our Telegram channel",
              url: "https://t.me/mecha_mon",
              completed: false,
              reward: 100
            },
            {
              task: "Follow us on Twitter",
              url: "https://x.com/mecha_mon_ai",
              completed: false,
              reward: 180
            },
            {
              task: "Subscribe to our Youtube channel",
              url: "https://www.youtube.com/@mechamon_ai",
              completed: false,
              reward: 125
            },
            {
              task: "Join our telegram community group",
              url: "https://t.me/+a41_d9PVSGw5MWY1",
              completed: false,
              reward: 150
            }
          ]
        });
        await tasks.save();
        const oneDayInMilliseconds = 86400 * 1000;
        const dailyRewards =new DailyRewardsModel({
          id: userDet.id,
          details:[
            {
              reward: 100,
              claimed: false,
              time: new Date()
            },
            {
              reward: 150,
              claimed: false,
              time: new Date(Date.now() + oneDayInMilliseconds)
            },
            {
              reward: 200,
              claimed: false,
              time: new Date(Date.now() + oneDayInMilliseconds * 2)
            },
            {
              reward: 250,
              claimed: false,
              time: new Date(Date.now() + oneDayInMilliseconds * 3)
            },
            {
              reward: 300,
              claimed: false,
              time: new Date(Date.now() + oneDayInMilliseconds * 4)
            },
            {
              reward: 350,
              claimed: false,
              time: new Date(Date.now() + oneDayInMilliseconds * 5)
            },
            {
              reward: 400,
              claimed: false,
              time: new Date(Date.now() + oneDayInMilliseconds * 6)
            }
          ]
        });
        await dailyRewards.save();
        return res.json({ resource: newResource });

      }
    }
    res.send('Data is valid')
  } catch (err) {
    res.send(err)
    console.log(err)
  }
})

module.exports = router