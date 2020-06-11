const express = require('express')

const router = express.Router()

const Extensions = require('../../../discord/models/extensions')

const extList = require('../../../constants').ext_list

router.use(async function (req, res, next) {
    try {
        let guild = req.user.guilds.find(r => r.id === req.sid)
        if (guild && Number(guild.permissions) & 8) {
            if (req.bot.guilds.cache.find(r => r.id === req.sid)) {
                req.guild = await Extensions.findOne({sid: req.sid})
                return next()
            } else {
                return res.redirect(`https://discordapp.com/oauth2/authorize?client_id=719062512917676123&scope=bot&permissions=8&guild_id=${req.sid}`)
            }
        }
        return res.status(401).send('권한이 없습니다.')
    } catch (e) {
        return res.status(500).send('ERR')
    }
})

router.get('/',async (req, res) => {
    res.render('manage/admin/dashboard', {user: req.user, data: req.guild})
})

router.get('/switch/:ext/true', async (req, res) => {
    const field = await Extensions.findOne({sid: req.sid})
    if (Object.values(extList).includes(req.params.ext)) {
        field[req.params.ext] = true
        await field.save()
        return res.render('manage/admin/redirect', {url: `/servers/${req.sid}`})
    }
    return res.status(404).send("기능 ID가 일치하지 않습니다.")
})
router.get('/switch/:ext/false', async (req, res) => {
    const field = await Extensions.findOne({sid: req.sid})
    if (Object.values(extList).includes(req.params.ext)) {
        field[req.params.ext] = false
        await field.save()
        return res.render('manage/admin/redirect', {url: `/servers/${req.sid}`})
    }
    return res.status(404).send("기능 ID가 일치하지 않습니다.")
})


module.exports = router