const Category = require('../models/categoryModel');
const cloudinary = require('../middlewares/cloudinary')
const path = require('path');
const fs = require('fs');

// scripts/seedCategories.js
const mongoose = require('mongoose');

// Function to create category and sub-category with image upload


const createCategories = async (req, res) => {
    try {
        const { name, description, subCategories } = req.body;
        let image = {};

        // Upload main category image if provided
        if (req.files['image']) {
            const result = await cloudinary.uploader.upload(req.files['image'][0].path, {
                folder: 'categoryImages'
            });
            image = {
                public_id: result.public_id,
                url: result.secure_url
            };
        }

        // Parse and handle sub-categories
        let parsedSubCategories = [];
        if (subCategories) {
            const subCategoriesArray = JSON.parse(subCategories);
            for (const [index, subCategory] of subCategoriesArray.entries()) {
                let subCategoryImage = {};
                if (req.files[`subCategoryImage-${index}`]) {
                    const subCategoryImageResult = await cloudinary.uploader.upload(req.files[`subCategoryImage-${index}`][0].path, {
                        folder: 'subCategoryImages'
                    });
                    subCategoryImage = {
                        public_id: subCategoryImageResult.public_id,
                        url: subCategoryImageResult.secure_url
                    };
                }

                parsedSubCategories.push({
                    name: subCategory.name,
                    description: subCategory.description,
                    subImage: subCategoryImage
                });
            }
        }

        const newCategory = new Category({
            name,
            description,
            image,
            subCategories: parsedSubCategories
        });

        await newCategory.save();

        res.status(201).json(newCategory);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
     

const getAllCategory = async (req, res) => {
    try {
        const categories = await Category.find({});
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Create a new category
const createCategory = async (req, res) => {
    try {
        const { categoryName, categoryInfo } = req.body;
        const category = await Category.create({ categoryName, categoryInfo });
        res.status(201).json({ 
            message: `Category added successfully`,
            data: category
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

// Update an existing category
const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { categoryName, categoryInfo } = req.body;
        const updatedCategory = await Category.findByIdAndUpdate(id, { categoryName, categoryInfo }, { new: true });
        if (!updatedCategory) {
            return res.status(404).json({
                error: 'Category not found'
            });
        }
        res.status(200).json({
            message: `Category updated successfully`,
            data: updatedCategory
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

// Delete a category
const deleteCategory = async (req, res) => {
    try {
        const id = req.params.categoryId;
        const deletedCategory = await Category.findByIdAndDelete(id);
        if (!deletedCategory) {
            return res.status(404).json({
                error: 'Category not found'
            });
        }
        res.status(200).json({
            message: `Category deleted`,
            data: {}
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

// Get a single category by ID
const getCategoryById = async (req, res) => {
    try {
        const id= req.params.categoryId;
        const category = await Category.findById(id).populate('products');
        if (!category) {
            return res.status(404).json({
                error: 'Category not found'
            });
        }
        res.status(200).json({
            message: `Category fetched`,
            data: category
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};

// Get all categories
const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find().populate('products');
        res.status(200).json({
            message: `There are ${categories.length} categories here`,
            data: categories
        });
    } catch (error) {
        res.status(500).json({
            error: error.message
        });
    }
};
// const defaultCategories = [
//     {
//         name: 'Electronics',
//         description: 'Devices and gadgets',
//         image: {
//             public_id: 'sample',
//             url: 'https://via.placeholder.com/150'
//         },
//         subCategories: [
//             { 
//                 name: 'Mobile Phones', 
//                 description: 'Smartphones and accessories',
//                 image: {
//                     public_id: 'sample',
//                     url: 'https://via.placeholder.com/150'
//                 }
//             },
//             { 
//                 name: 'Laptops', 
//                 description: 'Personal and professional laptops',
//                 image: {
//                     public_id: 'sample',
//                     url: 'https://via.placeholder.com/150'
//                 }
//             }
//         ]
//     },
//     {
//         name: 'Fashion',
//         description: 'Clothing and accessories',
//         image: {
//             public_id: 'sample',
//             url: 'https://via.placeholder.com/150'
//         },
//         subCategories: [
//             { 
//                 name: 'Men', 
//                 description: 'Clothing for men',
//                 image: {
//                     public_id: 'sample',
//                     url: 'https://via.placeholder.com/150'
//                 }
//             },
//             { 
//                 name: 'Women', 
//                 description: 'Clothing for women',
//                 image: {
//                     public_id: 'sample',
//                     url: 'https://via.placeholder.com/150'
//                 }
//             }
//         ]
//     },
//     // Add more categories and sub-categories as needed
// ];

// const seedCategories = async () => {
//     try {
//         // Connect to the database
//         await mongoose.connect('mongodb+srv://ebenezertope4:a7RdweTeIDECSlkP@cluster0.bygnfri.mongodb.net/5SquareDB', {
//             useNewUrlParser: true,
//             useUnifiedTopology: true
//         });

//         // Insert default categories if they do not exist
//         for (const category of defaultCategories) {
//             const existingCategory = await Category.findOne({ name: category.name });
//             if (!existingCategory) {
//                 await Category.create(category);
//                 console.log(`Category ${category.name} created`);
//             } else {
//                 console.log(`Category ${category.name} already exists`);
//             }
//         }

//         console.log('Default categories initialized');
//     } catch (error) {
//         console.error('Error initializing categories:', error);
//     // } finally {
//     //     // Close the database connection
//     //     await mongoose.connection.close();
//     }
// };

// seedCategories();
module.exports = { createCategories, createCategory, updateCategory, getAllCategory, getAllCategories, getCategoryById, deleteCategory }