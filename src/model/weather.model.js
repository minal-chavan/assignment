const { any, object } = require('@hapi/joi');

const mongoose = require('mongoose'),
{ Schema } = mongoose,

weather = new Schema({
    api_call_date: {
        type: Number,
        default:0
    },
    weather:{
        type:Object,
        default:{}
    }
    
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } },
    { strict: false },
)
module.exports = mongoose.model('weather', weather, 'weather');
