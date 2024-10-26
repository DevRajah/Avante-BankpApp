const router = require("express").Router();

const { createCategories, createCategory, updateCategory,getAllCategory, getAllCategories, getCategoryById, deleteCategory } = require("../controllers/categoryController");
const { authenticate } = require("../middlewares/authentication");
const upload = require('../middlewares/multerSub');

//Endpoint to create category with sub categories
router.post('/categories', upload.fields([
   // { name: 'image', maxCount: 1 }, // For main category image
    { name: 'subCategoryImage-0', maxCount: 1 }, // Assuming you have multiple sub-category images
    { name: 'subCategoryImage-1', maxCount: 1 },
    { name: 'subCategoryImage-2', maxCount: 1 },
    { name: 'subCategoryImage-3', maxCount: 1 },
    { name: 'subCategoryImage-4', maxCount: 1 },
    { name: 'subCategoryImage-5', maxCount: 1 },
    { name: 'subCategoryImage-6', maxCount: 1 },
    { name: 'subCategoryImage-7', maxCount: 1 },
    { name: 'subCategoryImage-8', maxCount: 1 },
    { name: 'subCategoryImage-9', maxCount: 1 },
    { name: 'subCategoryImage-10', maxCount: 1 },
    // Add more as needed for additional sub-categories
]), createCategories),


//endpoint to create product category
router.post('/create-category',authenticate,createCategory)

// GET /api/categories - Fetch all categories with sub-categories
router.get('/all-categories', getAllCategory)

//endpoint to update product category
router.put('/update-category/:id', authenticate, updateCategory)

//endpoint to get all product categories
router.get('/get-categories', getAllCategories)

//endpoint to get one category by id
router.get("/get-one-category",authenticate, getCategoryById)

//endpoint to delete category by id
router.delete("/delete-category/:categoryId", authenticate, deleteCategory)


module.exports = router