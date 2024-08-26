const router = require('express').Router()
const validate = require('../middlewares/validate')
const ResourceModels = require('../Models/ResourcesModel')

router.post('/', validate, async (req, res) => {
    const id = req.id;
    const time=new Date();
    try {
        const resource = await ResourceModels.findOne({ id });
        if (resource) {
            const coins = Math.floor(resource.bots * 60 * 17);
            const diff=(time-resource.lastCheckin)/1000;
            const coinsToAdd=Math.floor(diff);
            resource.lastCheckin=time;
            resource.tokens += coinsToAdd*coins;
            resource.save();
            res.send(resource)

        } else {
            res.status(404).json({ error: 'Resource not found' });
        }
    }
    catch (err) {
        console.error('Error updating coins:', err);
        res.status(500).json({ error: 'Server error' });
    }
})

module.exports = router