const mysql2 = require('mysql2/promise');
const db = mysql2.createPool({
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: '',
    database: 'test',
    waitForConnections: true,
    connectionLimit: 4,
    queueLimit: 0
});
async function startApp(app, port) {
    try {
        const connected = await db.query(`SELECT 1+1 AS RESULT`);
        app.listen(port, () => {
            console.log(`server is running on port ${port}`);
        })
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}
module.exports={db,startApp};