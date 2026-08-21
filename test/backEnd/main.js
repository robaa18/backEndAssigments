const express = require('express');
const app = express();
const cors = require('cors')
const { startApp, db } = require('./db.js');
const port = 3000;
app.use(cors(), express.json());
startApp(app, port);
//sign up 
//recieve data
//check the database 
//if the user already found error
//if no user with the same email create new one
app.post('/user/signup', async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const [duplicatedAccount] = await db.execute(`SELECT * FROM USERS WHERE EMAIL=?`, [email]);
        if (!duplicatedAccount?.length) {
            const [account] = await db.execute(`INSERT INTO USERS (NAME , EMAIL, PASSWORD) VALUES (?,?,?)`, [name, email, password]);
            if (!account?.affectedRows) {
                res.status(409).json({ message: 'email already exist' });
            }else{
            res.status(201).json({ message: 'created successfully' });}
        } else {
            res.status(409).json({ message: 'email already exist' });
        }
    } catch (error) {
        res.status(500).json({ message: 'internal server error' });
    }
})
//recieve data
//check credintials 
//check exist or not
//if exist  return data
//if not error
app.post('/user/login', async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const [account] = await db.execute(`SELECT * FROM USERS WHERE EMAIL=? && PASSWORD=?`, [email,password]);
        if (account?.length) {
            res.status(200).json({ message: 'login successfully',account });
        } else {
            res.status(401).json({ message: 'invalid credintials' });
        }
    } catch (error) {
        res.status(500).json({ message: 'internal server error' });
    }
})



