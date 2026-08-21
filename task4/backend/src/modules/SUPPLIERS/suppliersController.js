import { Router } from "express";
import { successResponse } from '../../common/utils/index.js'
const router = Router();
import * as suppliersService from './suppliersService.js';
//SUPPLIERS
// ● Create a supplier.
router.post('/create', async (req, res) => {
    const data = await suppliersService.createSupplier(req.body);
    return successResponse({ res, data, status: 200 });
});
// ● Retrieve all suppliers.
router.get('/getAll', async (req, res) => {
    const data = await suppliersService.getAllSuppliers();
    return successResponse({ res, data, status: 200 });

});

// ● Update supplier information.
router.patch('/update/:id', async (req, res) => {
    const { id } = req.params;
    const data = await suppliersService.updateSupplierInfo({ id, ...req.body });
    return successResponse({ res, data, status: 200 });
});
// ● Delete a supplier.
router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
    const data = await suppliersService.deleteSupplier(id);
    return successResponse({ res, data, status: 200 });

});
// ● Change ContactNumber to VARCHAR(15). 
router.patch('/changeContactNumber', async (req, res) => {
    const data = await suppliersService.changeContactNumber();
    return successResponse({ res, data, status: 200 });

});

// a. Add a supplier with the name 'FreshFoods' and contact number '01001234567'. 
router.post('/addFreshFoods', async (req, res) => {
    const data = await suppliersService.createSupplierFreshFood();
    return successResponse({ res, data, status: 200 });
});
export default router;
