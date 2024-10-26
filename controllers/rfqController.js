// routes/rfq.js
const express = require('express');
const RFQ = require('../models/rfqModel');
const rfqPostModel = require('../models/rfqPostModel');
const fs = require('fs');
const path = require('path');
const cloudinary = require("../middlewares/cloudinary");
const asyncHandler = require('express-async-handler');


// POST /rfq - Submit a new RFQ
const rfqForm = asyncHandler(async (req, res) => {
    try {
        const userId = req.user.userId;

        const { productName, productCategory, quantity, details, preferredUnitPrice, sourcingType, sourcingPurpose, tradeTerms, quantityUnits, certification, destination, leadTime, paymentMethod, shippingMethod } = req.body;

        // Check if files are uploaded
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({
                message: 'No files were uploaded'
            });
        }

        const filePaths = req.files.map(file => path.resolve(file.path));

        // Check if all files exist
        const allFilesExist = filePaths.every(filePath => fs.existsSync(filePath));

        if (!allFilesExist) {
            return res.status(400).json({
                message: 'One or more uploaded files not found'
            });
        }

        // Upload the images to Cloudinary and collect the results
        const cloudinaryUploads = await Promise.all(filePaths.map(filePath => cloudinary.uploader.upload(filePath, {
            folder: "RFQ-Images"
        })));

        // Create a new RFQ with the first uploaded image's details
        const newRFQ = new RFQ({
            user: userId,
            productCategory,
            productName,
            quantity,
            details,
            preferredUnitPrice,
            sourcingPurpose,
            tradeTerms,
            sourcingType,
            quantityUnits,
            certification,
            destination,
            leadTime,
            paymentMethod,
            shippingMethod,
            attachment: cloudinaryUploads.map(upload => ({
                public_id: upload.public_id,
                url: upload.secure_url
            }))
        });

        // Save the RFQ to the database
        await newRFQ.save();

        return res.status(201).json({
            message: 'RFQ submitted successfully',
            rfq: newRFQ
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Internal server error: ' + error.message
        });
    } finally {
        // Cleanup the uploaded files
        req.files.forEach(file => {
            const filePath = path.resolve(file.path);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        });
    }
});



// Function for the Request for Quotation page
const rfqPost = asyncHandler(async (req, res) => {
    try {
        const userId = req.user.userId;

        const { productName, sourcingQuantity, quantityUnit, detailedRequirement } = req.body;

        // Check if files are uploaded
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({
                message: 'No files were uploaded'
            });
        }

        const filePaths = req.files.map(file => path.resolve(file.path));

        // Check if all files exist
        const allFilesExist = filePaths.every(filePath => fs.existsSync(filePath));

        if (!allFilesExist) {
            return res.status(400).json({
                message: 'One or more uploaded files not found'
            });
        }

        // Upload the images to Cloudinary and collect the results
        const cloudinaryUploads = await Promise.all(filePaths.map(filePath => cloudinary.uploader.upload(filePath, {
            folder: "RFQ-Post-Images"
        })));

        // Create a new RFQ Post with the first uploaded image's details
        const newRFQ = new rfqPostModel({
            productName, 
            sourcingQuantity, 
            quantityUnit, 
            detailedRequirement,
            attachments: cloudinaryUploads.map(upload => ({
                public_id: upload.public_id,
                url: upload.secure_url
            }))
        });

        // Save the RFQ to the database
        await newRFQ.save();

        return res.status(201).json({
            message: 'RFQ submitted successfully',
            RFQ_POST: newRFQ
        });
    } catch (error) {
        return res.status(500).json({
            message: 'Internal server error: ' + error.message
        });
    } finally {
        // Cleanup the uploaded files
        req.files.forEach(file => {
            const filePath = path.resolve(file.path);
            if (fs.existsSync(filePath)) {
                fs.unlinkSync(filePath);
            }
        });
    }
});





const quantityUnits = async (req, res) => {
    try {
        //const user = req.user.userId
        const units = [
            "acres",
            "amperes",
            "bags",
            "barrels",
            "blades",
            "boxes",
            "bushels",
            "carats",
            "cartons",
            "cases",
            "centimeters",
            "chains",
            "combos",
            "cubic centimeters",
            "cubic feet",
            "cubic inches",
            "cubic meters",
            "cubic yards",
            "°Celsius",
            "°Fahrenheit",
            "dozens",
            "drams",
            "fluid ounces",
            "feet",
            "forty - foot container",
            "furlongs",
            "gallons",
            "gills",
            "grains",
            "grams",
            "gross",
            "hectares",
            "hertz",
            "inches",
            "kiloamperes",
            "kilograms",
            "kilohertz",
            "kilometers",
            "kiloohms",
            "kilovolts",
            "kilowatts",
            "liters",
            "long tons",
            "megahertz",
            "meters",
            "metric tons",
            "miles",
            "milliamperes",
            "milligrams",
            "millihertz",
            "milliliters",
            "millimeters",
            "milliohms",
            "millivolts",
            "milliwatts",
            "nautical miles",
            "ohms",
            "ounces",
            "packs",
            "pairs",
            "pallets",
            "parcels",
            "perches",
            "pieces",
            "pints",
            "plants",
            "poles",
            "pounds",
            "quarts",
            "quarters",
            "rods",
            "rolls",
            "sets",
            "sheets",
            "short tons",
            "square centimeters",
            "square feet",
            "square inches",
            "square meters",
            "square miles",
            "square yards",
            "stones",
            "strands",
            "tons",
            "tonnes",
            "trays",
            "twenty-foot container",
            "units",
            "volts",
            "watts",
            "Wp",
            "yards"
        ]
        return res.status(200).json({
            message: "Units successfully fetched!",
            data: units
        });

    } catch (error) {
        message = error.message
    }
}


module.exports = {
    rfqForm,
    rfqPost,
    quantityUnits
};
