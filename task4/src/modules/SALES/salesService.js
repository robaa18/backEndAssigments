import { db } from '../../DB/DB.js';
export const addSale = async (inputs) => {
    const { QuantitySold, ProductID, SaleDate } = inputs;
    const query = `INSERT INTO SALES (QuantitySold,ProductID,SaleDate) VALUES (?,?,?)`;
    const [result] = await db.execute(query, [QuantitySold, ProductID, SaleDate]);
    if (!result?.affectedRows) {
        throw new Error('invalid data', { cause: { status: 400 } });
    } else {
        return result;
    }
}

export const getAllSales = async (inputs) => {
    const query = `SELECT * FROM SALES`;
    const [result] = await db.execute(query);
    if (!result?.length) {
        throw new Error('NO SALES FOUND', { cause: { status: 404 } });
    } else {
        return result;
    }
}

export const getSaleForSpecificProduct = async (inputs) => {
    const query = `SELECT * FROM SALES  WHERE ProductID=?`;
    const [result] = await db.execute(query, [inputs]);
    if (!result?.length) {
        throw new Error('NO SALE FOUND', { cause: { status: 400 } });
    } else {

        return result;
    }
}
export const addMilkSale = async () => {
    // c. Add a record for the sale of 2 units of 'Milk' made on '2025-05-20'.
    const [product] = await db.execute(`SELECT ProductID  FROM PRODUCTS WHERE ProductName =?`, ['MILK']);
    const pID = product[0].ProductID;
    const query = `INSERT INTO SALES (QuantitySold,ProductID,SaleDate) VALUES (?,?,?)`;
    const [result] = await db.execute(query, [2, pID, '2025-05-20']);
    if (!result?.affectedRows) {
        throw new Error('invalid data', { cause: { status: 400 } });
    } else {
        return result;
    }
}