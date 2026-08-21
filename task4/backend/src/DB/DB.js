import mysql2 from 'mysql2/promise';
const db = mysql2.createPool({
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: '',
    database: 'task4',
    waitForConnections: true,
    connectionLimit: 4,
    queueLimit: 0
})
async function startServer(app, port) {
    try {
        const [data] = await db.query(`SELECT 1+1 AS RESULT`);
        console.log('db connected');
        return app.listen(port, () => {
            console.log(`server is running on port ${port}`);
        })
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}
export { db, startServer };