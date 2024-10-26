// models/Category.js
const mongoose = require('mongoose');

const subCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    subImage: {
        public_id: String,
        url: String
    },
    products: [{
                type: mongoose.SchemaTypes.ObjectId,
                    ref: "Product"
            }]
});

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: false
    },
    image: {
        public_id: String,
        url: String
    },
   
    products: [{
        type: mongoose.SchemaTypes.ObjectId,
            ref: "Product"
    }],
    subCategories: [subCategorySchema]
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;




// const mongoose = require("mongoose")
// const categorySchema = new mongoose.Schema({
//     categoryName:{
//         type: String,
//         require: true
//     },
//     categoryInfo:{
//         type: String,
//     },
    
//     products: [{
//         type: mongoose.SchemaTypes.ObjectId,
//             ref: "Product"
//     }]
// }, {timestamps: true})

// const categoryModel = mongoose.model("Category", categorySchema)
// module.exports = categoryModel