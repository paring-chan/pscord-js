const express = require('express')
const router = express.Router()
const btoa = require('btoa')
global.fetch = require('node-fetch')
const FormData = require('form-data')

const red = encodeURIComponent(process.env.OAUTH2_REDIRECT_URI)
const cid = process.env.OAUTH2_CLIENT_ID
const csr = process.env.OAUTH2_CLIENT_SECRET

router.get('/login', (req, res, next) => {
    res.redirect([
        'https://discordapp.com/oauth2/authorize',
        `?client_id=${cid}`,
        '&scope=identify+guilds',
        '&response_type=code',
        `&callback_uri=${red}`
    ].join(''))
})

router.get('/callback',async (req, res) => {
    if (!req.query.code) throw new Error("NoCodeProvided")
    const code = req.query.code
    const cred = btoa(`${cid}:${csr}`)
    const response = fetch(`https://discordapp.com/api/oauth2/token`, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Basic ${cred}`
        },
        method: "POST",
        body: `client_id=${cid}&code=${code}&grant_type=authorization_code`
    })
    response.then(rs => {
        rs.text().then(body => {
            body = JSON.parse(body)
            req.session.access_token = body.access_token
            res.redirect('/')
        })
    })
})

router.get('/logout', (req, res) => {
    req.session.access_token = undefined
    res.redirect('/')
})

module.exports = router