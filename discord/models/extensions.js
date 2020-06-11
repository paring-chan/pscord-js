const mongoose = require('mongoose')

const ExtensionsSchema = new mongoose.Schema({
    sid: Number,
    music: {type: Boolean, default: true},
    profile: {type: Boolean, default: true},
})

module.exports = mongoose.model('discord.extensions', ExtensionsSchema)