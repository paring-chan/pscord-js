const express = require('express')
const router = express.Router()

router.use(function (req, res, next) {
    if (req.user) {
        next()
    }
    else {
        res.redirect('/auth/login')
    }
})

router.use('/:sid', function (req, res, next) {
    req.sid = req.params.sid
    next()
}, require('./admin'))

router.get('/', (req, res) => {
    res.render('manage/servers', {guilds: req.user.guilds, user: req.user})
})

module.exports = router