import { db } from '../../DB/DB.js';
export const createSupplier = async (inputs) => {
    const { SupplierName, ContactNumber } = inputs;
    const query = `INSERT INTO SUPPLIERS (SupplierName,ContactNumber) VALUES (?,?)`;
    const [result] = await db.execute(query, [SupplierName, ContactNumber]);
    if (!result?.affectedRows) {
        throw new Error('invalid data', { cause: { status: 400 } });
    } else {
        return result;
    }
}
export const getAllSuppliers = async (inputs) => {
    const query = `SELECT * FROM SUPPLIERS`;
    const [result] = await db.execute(query);
    if (!result?.length) {
        throw new Error('NO SUPPLIER FOUND', { cause: { status: 404 } });
    } else {
        return result;
    }
}

export const updateSupplierInfo = async (inputs) => {
    const { id, SupplierName, ContactNumber } = inputs;
    const query = `
        UPDATE SUPPLIERS
        SET SupplierName = COALESCE(?, SupplierName),
            ContactNumber = COALESCE(?, ContactNumber)
           WHERE SupplierID =?
        `;
    const [result] = await db.execute(query, [SupplierName ?? null, ContactNumber ?? null, id]);
    if (!result?.affectedRows) {
        throw new Error('NO SUPPLIER FOUND', { cause: { status: 404 } });
    }
    else {
        return result;

    }
}
export const deleteSupplier = async (inputs) => {
    const query = `DELETE FROM SUPPLIERS WHERE SupplierID=? `;
    const [result] = await db.execute(query, [inputs]);
    if (!result?.affectedRows) {
        throw new Error('NO SUPPLIER FOUND', { cause: { status: 404 } });
    } else {
        return result;

    }
}
export const changeContactNumber = async () => {
    const query = `ALTER TABLE SUPPLIERS MODIFY ContactNumber VARCHAR(15)`;
    const [result] = await db.execute(query);
    return result;
}

export const createSupplierFreshFood = async () => {
    const query = `INSERT INTO SUPPLIERS (SupplierName,ContactNumber) VALUES (?,?)`;
    const [result] = await db.execute(query, ['FreshFood ', '01001234567']);
    if (!result?.affectedRows) {
        throw new Error('invalid data', { cause: { status: 400 } });
    } else {
        return result;
    }
}