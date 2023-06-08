const contactController = require('../controller/contact')
const express = require('express')
const router = express.Router();

    router.post('/createContact',contactController.createContact);
    router.post('/getContact',contactController.getContact);
    router.post('/updateContact',contactController.updateContact);
    
    router.post('/deleteContact',contactController.deleteContact);

    
module.exports =router