const mongoose = require('mongoose');

const relayStatusSchema = mongoose.Schema(
    {
        deviceId: {
            type: String,
            required: [true, 'Please enter device id']
        },
        relayStatus: {
            type: Boolean,
            required: true,
            default: 0
        }
    }, 
    {
        timestamp: true
    }
)

const RelayStatus = mongoose.model('RelayStatus', relayStatusSchema);

module.exports = RelayStatus;