const express = require('express')
const router = express.Router()
const validate = require('../middlewares/validate')
const ResourceModels = require('../Models/ResourcesModel')


router.post('/upgrade', validate, async (req, res) => {
    const id = req.id
    const resource = await ResourceModels.findOne({ id: id });
    const booster = req.query.booster
    const currentTime = new Date();
    const lastCheckin = new Date(resource.lastCheckin);
    const diffInSeconds = Math.floor((currentTime - lastCheckin) / 1000)%60;
    if(diffInSeconds>=14400){
        diffInSeconds=14400;
    }
    resource.tokens += resource.bots * diffInSeconds;
    resource.lastCheckin=currentTime;
    if (resource) {
        if (booster === 'tapSize') {
            const tapSize = resource.tapSize
            const cost = Math.ceil(3.4 * 100 * Math.pow(4.01, tapSize))
            if (resource.tokens >= cost) {
                resource.tokens -= cost
                resource.tapSize += 1
            }
        } else if (booster === 'tapLimit') {
            const limit = resource.tapLimit
            const tapLimitCost = Math.ceil(3.4 * 100 * Math.pow(1.01, limit));
            if (resource.tokens >= tapLimitCost) {
                resource.tokens -= tapLimitCost
                resource.tapLimit += 50
                resource.tapsAvailable += 50
            }
        } else {
            const bots = resource.bots
            const botCost = Math.ceil(3.4 * 100 * Math.pow(4.1, bots));
            if (resource.tokens >= botCost) {
                resource.tokens -= botCost
                resource.bots += 1
            }
        }
        await resource.save()
    } else {
        res.send('Resource not found')
    }
})


router.post('/updateCoins', validate, async (req, res) => {
    let { actions } = req.body;
    const id = req.id;

    try {
        const resource = await ResourceModels.findOne({ id });

        if (!resource) {
            return res.status(404).json({ error: 'Resource not found' });
        }

        const currentTime = new Date();
        const lastTapTime = new Date(resource.lastTap);
        const diffInSeconds = Math.floor((currentTime - lastTapTime) / 1000);

        const maxTaps = resource.tapLimit;
        const newTapsAvailable = Math.min(resource.tapsAvailable + diffInSeconds, maxTaps);

        actions = Math.min(actions, newTapsAvailable);

        resource.tokens += resource.tapSize * actions;
        resource.tapsAvailable = newTapsAvailable - actions;
        resource.lastTap = currentTime;

        await resource.save();

        res.json({ success: true, resource });
    } catch (err) {
        console.error('Error updating coins:', err);
        res.status(500).json({ error: 'Server error' });
    }
});
router.post('incCoins', validate, async (req, res) => {
    const { coins } = req.body;
    const id = req.id;
    try {
        await ResourceModels.findOneAndUpdate(
            { id },
            { $inc: { tokens: coins } },
            { new: true }
        );
    }
    catch (err) {
        console.error('Error updating coins:', err);
        res.status(500).json({ error: 'Server error' });
    }
})



module.exports = router