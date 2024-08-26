const mg=require('mongoose');
const ReferralSchema = new mg.Schema({
    id: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    referred: {
        type:Array,
        default:[],
    }
});
const ReferralModel = mg.model('Referral', ReferralSchema);
module.exports = ReferralModel;