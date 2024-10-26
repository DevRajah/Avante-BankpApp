const mongoose = require('mongoose');

const rfqSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    productName: {
        type: String,
        required: true,
    },
    sourcingQuantity: {
        type: Number,
        required: true,
    },
    quantityUnit: {
        type: String,
        required: true,
        enum: ["acres", "amperes", "bags", "barrels", "blades", "boxes", "bushels", "carats", "cartons", "cases", "centimeters", "chains",
            "combos", "cubic centimeters", "cubic feet", "cubic inches", "cubic meters", "cubic yards", "°Celsius", "°Fahrenheit", "dozens",
            "drams", "fluid ounces", "feet", "forty-foot container", "furlongs", "gallons", "gills", "grains", "grams", "gross", "hectares",
            "hertz", "inches", "kiloamperes", "kilograms", "kilohertz", "kilometers", "kiloohms", "kilovolts", "kilowatts", "liters", "long tons",
            "megahertz", "meters", "metric tons", "miles", "milliamperes", "milligrams", "millihertz", "milliliters", "millimeters", "milliohms",
            "millivolts", "milliwatts", "nautical miles", "ohms", "ounces", "packs", "pairs", "pallets", "parcels", "perches", "pieces", "pints",
            "plants", "poles", "pounds", "quarts", "quarters", "rods", "rolls", "sets", "sheets", "short tons", "square centimeters", "square feet",
            "square inches", "square meters", "square miles", "square yards", "stones", "strands", "tons", "tonnes", "trays", "twenty-foot container",
            "units", "volts", "watts", "Wp", "yards"],
    },
    detailedRequirement: {
        type: String,
        required: true,
    },
    attachments: {
        type: Array,
    }

}, { timeStamps: true });

const rfqPostModel = mongoose.model('RFQ-Post', rfqSchema);

module.exports = rfqPostModel;