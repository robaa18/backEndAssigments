
import { Router } from "express";
import * as reportsService from "./reportsService.js";
import { successResponse } from "../../common/utils/successResponse.js";
const router = Router();
// Create a reporting endpoint to retrieve the total quantity sold for each product using SQL aggregate functions. (0.5 Grade)  
router.get('/getTotalQuantity', async (req, res) => {
    const data = await reportsService.totalQuantitySold();
    return successResponse({ res, data, status: 200 });
});
// 10. Create a reporting endpoint to retrieve the product with the highest stock quantity. (0.5 Grade)  
router.get('/getHighestStock', async (req, res) => {
    const data = await reportsService.highestStock();
    return successResponse({ res, data, status: 200 });
});
// 11. Create a reporting endpoint to retrieve suppliers whose names start with 'F'. (0.5 Grade)  
router.get('/suppliersStartWithF', async (req, res) => {
    const data = await reportsService.getSuppliersStartWithF();
    return successResponse({ res, data, status: 200 });
});
// // 12. Create a reporting endpoint to retrieve all products that have never been sold. (0.5 Grade)  
router.get('/getProductsNeverSold', async (req, res) => {
    const data = await reportsService.productsNeverSold();
    return successResponse({ res, data, status: 200 });
});
// 13. Create a reporting endpoint to retrieve all sales including: (0.5 Grade)  
// ● Product name 
// ● Quantity sold 
// ● Sale date using SQL JOIN operations. 
router.get('/getAllSales', async (req, res) => {
    const data = await reportsService.getAllSales();
    return successResponse({ res, data, status: 200 });
});
export default router;
