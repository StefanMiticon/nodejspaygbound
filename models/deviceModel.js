const mongoose = require('mongoose');

const deviceSchema = mongoose.Schema(
    {
        AndroidVersion: {
            type: String,
            required: [true, 'Please enter valid Android Version']
        },
        IPAddress: {
            type: String,
            required: [true, 'Please enter valid IP Address']
        },
        LocalIPAddress: {
            type: String,
            required: [true, 'Please enter valid local IP Address']
        },
        DeviceID: {
            type: String,
            required: [true, 'Please enter valid device ID']
        },
        DeviceDevice: {
            type: String,
            required: [true, 'Please enter valid device device']
        },
        DeviceFingerPrint: {
            type: String,
            required: [true, 'Please enter valid device finger print']
        },
        DeviceBrand: {
            type: String,
            required: [true, 'Please enter valid device brand']
        },
        DeviceModel: {
            type: String,
            required: [true, 'Please enter valid device model']
        },
        DeviceName: {
            type: String,
            required: [true, 'Please enter valid device name']
        },
        DeviceType: {
            type: String,
            required: [true, 'Please enter valid device type']
        },
        AppVersion: {
            type: String,
            required: [true, 'Please enter valid App Version']
        }
    }, 
    {
        timestamp: true
    }
)

const Device = mongoose.model('Device', deviceSchema);

module.exports = Device;