import { Router } from "express";
import * as productService from "./productService.js";
import { successResponse } from "../../common/utils/successResponse.js";
const router = Router();
//PRODUCT
// ● Create a product.
router.post('/add', async (req, res) => {
    const data = await productService.createProduct(req.body);
    return successResponse({ res, data, status: 201 });
});
// ● Retrieve all products.
router.get('/getAll', async (req, res) => {
    const data = await productService.getAllProducts();
    return successResponse({ res, data, status: 200 });
});
// // ● Retrieve a product by ID.
router.get('/getProduct/:id', async (req, res) => {
    const { id } = req.params;
    const data = await productService.getProductById(id);
    return successResponse({ res, data, status: 200 });
});
// ● Update a product.
router.patch('/update/:id', async (req, res) => {
    const { id } = req.params;
    console.log({ id, ...req.body });
    const data = await productService.updateProduct({ id, ...req.body });
    return successResponse({ res, data, status: 200 });
});
// ● Delete a product.
router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
    const data = await productService.deleteProduct(id);
    return successResponse({ res, data, status: 200 });
});

// ● Add a Category column to the Products table. 
router.patch('/addColumn', async (req, res) => {
    const data = await productService.addCategory();
    console.log(data);
    return successResponse({ res, data, status: 200 });
});
// ● Remove the Category column. 
router.patch('/removeColumn', async (req, res) => {
    const data = await productService.removeCategory();
    console.log(data);
    return successResponse({ res, data, status: 200 });
});

// ● Add a NOT NULL constraint to ProductName.
router.patch('/addNotNullConstraint', async (req, res) => {
    const data = await productService.addNOTNULLConstraint();
    return successResponse({ res, data, status: 200 });

});
// b. Insert the following three products, all provided by 'FreshFoods': 
// i. 
// c. Add a record for the sale of 2 units of 'Milk' made on '2025-05-20'. 
// 7. Create an API endpoint to update the price of 'Bread' to 25.00. (0.5 Grade)  
// 8. Create an API endpoint to delete the product 'Eggs'. (0.5 Grade) 
router.post('/addFreshFoodProducts', async (req, res) => {
    const data = await productService.createFreshFoodProduct();
    return successResponse({ res, data, status: 201 });
});
// 7. Create an API endpoint to update the price of 'Bread' to 25.00. (0.5 Grade)  
router.patch('/updateBread', async (req, res) => {
    const data = await productService.updateBread();
    return successResponse({ res, data, status: 200 });

});
// 8. Create an API endpoint to delete the product 'Eggs'. (0.5 Grade)  
router.delete('/deleteEggs', async (req, res) => {
    const data = await productService.deleteEggs();
    return successResponse({ res, data, status: 200 });
});
export default router;
