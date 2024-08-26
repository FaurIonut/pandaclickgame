const mg=require('mongoose');

const DailyRewardsSchema = new mg.Schema({
    id: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    details: [
        {
            reward: {
                type: Number,
                required: true
            },
            claimed: {
                type: Boolean,
                required: true
            },time:{
                type:Date,
            }
        }
    ]
});

const DailyRewardsModel = mg.model('DailyReward', DailyRewardsSchema);
module.exports = DailyRewardsModel;