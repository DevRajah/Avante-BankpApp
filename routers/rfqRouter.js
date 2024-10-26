const express = require('express');

const router = express.Router();
const { rfqForm, rfqPost, quantityUnits } = require("../controllers/rfqController")
const { authenticate, Admin, } = require("../middlewares/authentication");
const { upload } = require("../middlewares/multer");


//Endpoint to fill RFQ
router.post('/rfq', authenticate, upload.array('attachment', 5),authenticate, rfqForm);

//Endpoint to post a Request for Quotation
router.post('/rfq-post', authenticate, upload.array('attachment', 5),authenticate, rfqPost);

//Endpoint to fetch all the quantity units
router.get('/quantity-units', quantityUnits)

module.exports = router;
