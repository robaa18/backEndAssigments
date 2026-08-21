import { Router } from "express";
import { successResponse } from '../../common/utils/index.js'
const router = Router();
import { addMilkSale, addSale, getAllSales, getSaleForSpecificProduct } from './salesService.js'

// //SALES

// Record a sale. 
router.post('/add', async (req, res) => {
    const data = await addSale(req.body);
    return successResponse({ res, data, status: 201 });
});
// ● Retrieve all sales. 
router.get('/getSales', async (req, res) => {
    const data = await getAllSales();
    return successResponse({ res, data, status: 200 });
});
// ● Retrieve sales for a specific product.
router.get('/getProductSale/:id', async (req, res) => {
    const { id } = req.params;
    const data = await getSaleForSpecificProduct(id);
    if (data?.length == 0) {
        return res.status(404).json({ message: "NO PRODUCT FOUND" });
    }
    return successResponse({ res, data, status: 200 });
});
// c. Add a record for the sale of 2 units of 'Milk' made on '2025-05-20'.
router.post('/addMilkSale', async (req, res) => {
    const data = await addMilkSale();
    return successResponse({ res, data, status: 201 });
});
export default router;















