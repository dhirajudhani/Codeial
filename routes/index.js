// This index is entry point to all my routes
const express = require("express");

const router = express.Router();
const homeController = require('../controllers/home_controller')


console.log("router loaded");

router.get('/',homeController.home);
router.use('/users',require('./users'));

// for any furthur routes , access from here

module.exports = router;