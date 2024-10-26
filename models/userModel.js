const { timeStamp } = require('console');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    country: {
        type: String, 
        default: "Nigeria"
    }, 
    state: {
        type: String, 
    },
    tradeRole: {
        type: String, 
    }, 
    email: {
        type: String, 
    },
    fax: {
        type: String, 
        default: "None"
    },
    mobile: {
        type: String, 
        default: "None"
    },
    phoneNumber: {
        type: String, 
        default: "None"
    },
    socialLinks: {
        type: String, 
        default: "None"
    },
    AlternativeEmail: {
        type: String, 
    },
    password: {
        type: String, 
    }, 
    confirmPassword: {
        type: String, 
    },
    companyName: {
        type: String, 
    },
    yearEStablished: {
        type: String, 
        default: "None"
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    tel: {
        type: String,
    }, 
    isVerified: {
        type: Boolean,
        default: false,
    },
    token: {
        type: String,
    },
    officialWebsite :{
        type : String,
        default: "None"
    },
    totalNumberOfEmployees:{
        type: String,
        enum : ["Total Number of Employees", "5 - 10 People", "11 - 50 People", "51 - 100 People", "101 - 200 People", "201 - 300 People", "301 - 500 People", "501 - 1000 People", "Above 1000 People"]
    },
    otpCode: {
        type: String,
        trim: true,
    },
    userInput: {
        type: String,
        trim: true,
    },
    businessType:{
        type : String,
        default: "None",
        enum :["online shop/store", "Manufacturer/ Factory", "Trading Company", "Distributor/ Wholesaler", "Retailer", "Buying Office", "Online Shop/ Store", "Individual", "other", "Service provider", "None"]
    },
    taxInformation:{
        type: String,
        default: "None"
    },
    platformForSelling:{
        type: String,
        default: "None"
    },
    mainProducts:{
        type: String,
        default: "None"
    },
    operationalAddress:{
        type: String,
        default: "None"
    },
    registeredAddress:{
        type: String,
    },
    aboutUs:{
        type: String,
        default: "None"
    },
    street:{
        type: String,
        default: "None"
    },
    alternativeEmail:{
        type: String
    },
    annualPurchasingVolume:{
        type: String,
        default: "None",
    },
    PlatformsforSelling:{
        type : String,
        enum : ["Amazon", "eBay", "Etsy", "Shopify", "Walmart", "wish", "Lazada",  "offline", "other"]

    },
    primarySourcingPurpose:{
        type: String,
        default: "None",
        enum :["For company internal use", "To resell items", "For production & processing", "For personal use", "Other", "None"]
    },
    averageSourcingFrequency:{
        type: String,
        default: "None",
        enum :["Never", "Daily", "Weekly", "Monthly", "Quarterly", "Once per year or less", "Project-based", "None"]
    },
    preferredSupplierQualifications:{
        type: String,
        default: "None",
        enum : ["Ability to customize", "Has items in stock", "Short lead time", "Exported to my country before", "Has a factory", "Other", "None"]
    },
    sourcingInformation: {

        industryA: {
            type: String,
            enum:["Electronics", "Health & Beauty", "Jewelry, Bags & Shoes", "Home, Lights & Construction", "Gifts, Sports & Hobbies","Apparel, Textiles & Accessories", "Packaging, Advertising & Office", "Auto & Transportation", "Machinery, Hardware & Tools", "Electrical Equipements, Components & Telecoms", "Agriculture & Food", "Metallurgy, Chemicals, Rubber & Plastics"]
        },
        industryB: {
            type: String,
            enum:["Electronics", "Health & Beauty", "Jewelry, Bags & Shoes", "Home, Lights & Construction", "Gifts, Sports & Hobbies","Apparel, Textiles & Accessories", "Packaging, Advertising & Office", "Auto & Transportation", "Machinery, Hardware & Tools", "Electrical Equipements, Components & Telecoms", "Agriculture & Food", "Metallurgy, Chemicals, Rubber & Plastics"]
        }
    
    },
    
    facebook:{
        type: String
    },
    linkedin:{
        type: String
    },
    orders: [{
        type : mongoose.Schema.Types.ObjectId,
        ref: "Order"
    }],
    profilePhoto: {
        url: {
            type: String
         },
        public_id:{
            type: String
        }
    }

}, {timeStamp: true});


const userModel = mongoose.model('User', userSchema);

module.exports = userModel;