import { db } from '../../DB/DB.js';
export const createProduct = async (inputs) => {
    const { productName, price, stockQuantity, supplierID } = inputs;
    const query = `INSERT INTO PRODUCTS (ProductName,PRICE,StockQuantity,SupplierID) VALUES (?,?,?,?)`;
    const [result] = await db.execute(query, [productName, price, stockQuantity, supplierID]);
    if (!result?.affectedRows) {
        throw new Error('invalid data', { cause: { status: 400 } });
    } else {
        return result;
    }
}
export const getAllProducts = async () => {
    const query = `SELECT * FROM products`;
    const [products] = await db.execute(query);
    return products;
}
export const getProductById = async (inputs) => {
    const query = `SELECT * FROM PRODUCTS WHERE ProductID=?`;
    const [product] = await db.execute(query, [inputs]);
    if (!product?.length) {
        throw new Error('NO PRODUCT FOUND', { cause: { status: 404 } });
    } else {

        return product;
    }
}
export const updateProduct = async (inputs) => {
    const { id, productName, price, stockQuantity, supplierID } = inputs;
    const query = `
        UPDATE PRODUCTS
        SET ProductName = COALESCE(?, ProductName),
            Price = COALESCE(?, Price),
            StockQuantity = COALESCE(?, StockQuantity),
            SupplierID = COALESCE(?, SupplierID)
        WHERE ProductID = ?
    `;
    const [result] = await db.execute(query, [productName ?? null, price ?? null, stockQuantity ?? null, supplierID ?? null, id]);
    if (!result?.affectedRows) {
        throw new Error('NO PRODUCT FOUND', { cause: { status: 404 } });
    }
    else {
        return result;

    }
}
export const deleteProduct = async (inputs) => {
    const query = `DELETE FROM PRODUCTS WHERE ProductID=? `;
    const [product] = await db.execute(query, [inputs]);
    if (!product?.affectedRows) {
        throw new Error('NO PRODUCT FOUND', { cause: { status: 404 } });
    } else {
        return product;

    }
}
// //  Create API endpoints to perform the following database modifications: (2 Grade)

// ● Add a Category column to the Products table.
export const addCategory = async () => {
    const query = `ALTER TABLE PRODUCTS ADD CATEGORY VARCHAR(50) `;
    const [column] = await db.execute(query);
    return column;
}
// ● Remove the Category column.
export const removeCategory = async () => {
    const query = `ALTER TABLE PRODUCTS DROP COLUMN  CATEGORY`;
    const [column] = await db.execute(query);
    return column;
}

// ● Add a NOT NULL constraint to ProductName.
export const addNOTNULLConstraint = async () => {
    const query = `ALTER TABLE Products
    MODIFY ProductName VARCHAR(50) NOT NULL;`;
    const [column] = await db.execute(query);
    return column;
}

// 'Milk' with a price of 15.00 and stock quantity of 50. 
// ii. 'Bread' with a price of 10.00 and stock quantity of 30. 
// iii. 'Eggs' with a price of 20.00 and stock quantity of 40. 
export const createFreshFoodProduct = async () => {
    const [supplier] = await db.execute(`SELECT SupplierID FROM SUPPLIERS WHERE SupplierName =?`, ['FreshFood']);
    const id = supplier[0].SupplierID;
    const query = `INSERT INTO PRODUCTS (ProductName,PRICE,StockQuantity,SupplierID) VALUES (?,?,?,?),
    (?,?,?,?),(?,?,?,?)`;
    const [result] = await db.execute(query, ['MILK', 15.00, 50, id, "bread", 10.00, 30, id, 'eggs', 20.00, 40, id]);
    if (!result?.affectedRows) {
        throw new Error('invalid data', { cause: { status: 400 } });
    } else {
        return result;
    }
}
// 7. Create an API endpoint to update the price of 'Bread' to 25.00. (0.5 Grade)  
export const updateBread = async () => {
    const query = `
        UPDATE PRODUCTS
        SET Price = ? WHERE productName = ?`;
    const [result] = await db.execute(query, [25.00, 'bread']);
    if (!result?.affectedRows) {
        throw new Error('NO PRODUCT FOUND', { cause: { status: 404 } });
    }
    else {
        return result;

    }
}
// 8. Create an API endpoint to delete the product 'Eggs'. (0.5 Grade)  
export const deleteEggs = async () => {
    const query = `DELETE FROM PRODUCTS WHERE productName=? `;
    const [product] = await db.execute(query, ['eggs']);
    if (!product?.affectedRows) {
        throw new Error('NO PRODUCT FOUND', { cause: { status: 404 } });
    } else {
        return product;

    }
}
