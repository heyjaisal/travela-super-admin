const express = require('express');
const router = express.Router();
const { createSuperAdmin, loginSuperAdmin, createAdmin, Getadmin, Getuser, Gethost } = require('../controllers/controll');
const verifySuperAdmin = require('../middlewares/authmiddle');
const upload = require('../config/asw');


router.post('/signup', createSuperAdmin); 
router.post('/login', loginSuperAdmin); 
router.post('/create-admin',verifySuperAdmin, createAdmin)
router.get('/get-admin',Getadmin)
router.get('/get-user',Getuser)
router.get('/get-host',Gethost)

module.exports = router;
