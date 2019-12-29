const {Router} = require('express')
const router = new Router()
const token = require("../controllers/token")
const {exist,sigin,sigup,profile} = require('../controllers/usuario.controller')

router.route('/exist').get(exist)
router.route('/sigin').post(sigin)
router.route('/sigup').post(sigup)
router.route('/profile').get(token,profile)
module.exports = router;