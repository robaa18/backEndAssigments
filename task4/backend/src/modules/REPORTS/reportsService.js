
import { db } from '../../DB/DB.js';
// Create a reporting endpoint to retrieve the total quantity sold for each product using SQL aggregate functions. (0.5 Grade)  
export const totalQuantitySold = async () => {
    const query = `
        SELECT PRODUCTS.ProductName, SUM(SALES.QuantitySold) AS TotalQuantitySold
        FROM SALES
        INNER JOIN PRODUCTS ON PRODUCTS.ProductID = SALES.ProductID
        GROUP BY SALES.ProductID, PRODUCTS.ProductName
    `;
    const [result] = await db.execute(query);
    return result;

}
// 10. Create a reporting endpoint to retrieve the product with the highest stock quantity. (0.5 Grade)  
export const highestStock = async () => {
    const query = `SELECT StockQuantity, ProductName  FROM PRODUCTS ORDER BY StockQuantity DESC LIMIT 1`;
    const [product] = await db.execute(query);
    return product;
}
// 11. Create a reporting endpoint to retrieve suppliers whose names start with 'F'. (0.5 Grade)  
export const getSuppliersStartWithF = async () => {
    const query = `SELECT * FROM SUPPLIERS WHERE SupplierName LIKE "F%"`;
    const [supplier] = await db.execute(query);
    return supplier;
}
// 12. Create a reporting endpoint to retrieve all products that have never been sold. (0.5 Grade)  
export const productsNeverSold = async () => {
    const query = `SELECT PRODUCTS.* FROM PRODUCTS LEFT JOIN SALES ON SALES.ProductID=PRODUCTS.ProductID WHERE QuantitySold IS NULL`;
    const [products] = await db.execute(query);
    return products;
}
// 13. Create a reporting endpoint to retrieve all sales including: (0.5 Grade)  
// ● Product name 
// ● Quantity sold 
// ● Sale date using SQL JOIN operations. 
export const getAllSales = async () => {
    const query = `SELECT ProductName,QuantitySold,SaleDate FROM SALES LEFT JOIN PRODUCTS ON SALES.ProductID=PRODUCTS.ProductID `;
    const [sales] = await db.execute(query);
    return sales;

}
