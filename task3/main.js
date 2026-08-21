//part2
const express = require('express');
const { error } = require('node:console');
const path = require('node:path');
const fs = require('node:fs');
let app = express();
let dest = path.resolve('./users.json');
const port = 3000;
let users = [];

let readFile = (req, res, next) => {
    fs.readFile(dest, 'utf-8', (error, data) => {
        if (error) {
            res.status(500).json({ error: "failed to read file" });
            return;
        }
        console.log(data);
        users = JSON.parse(data);
        console.log(users);
        next();
    })
}

let writeFile = () => {
    fs.writeFile(dest, JSON.stringify(users, null, 2), (error) => {
        if (error) {
            res.status(500).json({ error: "failed to write file" });
            return;
        }
    })
}
app.use(express.json());
app.use(readFile);
// Part2: Simple CRUD Operations Using Express.js:
// ı.For allthe following tasks, you must use the fs module to read and write data from a JSON
//  file (e.g., users.json). Do not store or manage data using arrays. (1 Grades)

// 1. Create an API that adds a new user to your users stored in a JSON file.
//  (ensure that the email of the new user doesn’t exist before)(1
// Grades)
// o URL: POST /user
app.post('/user', (req, res, next) => {
    //recieve the data from request 
    //read the file users.json
    //check the user does not exist
    //add the user
    console.log(req.body);
    const { email } = req.body;
    let found = users.find(user => user.email === email)
    if (found) {
        console.log('user found');
        res.status(409).json({ message: 'user alresdy exist' })
        return;
    }
    let id = 0;
    req.body.id = users.length + 1;
    users.push(req.body);
    writeFile();
    res.status(201).json({ message: "user added successfully" });
    return;
});



// 2. Create an API that updates an existing user's name, age, or email by their ID. The user 
// ID should be retrieved from the params. (1 Grade)
// Note:Remember to update the corresponding values in the JSON file
// o URL: PATCH /user/:id

app.patch('/user/:id', (req, res, next) => {
    //recieve the data from request 
    //read the file users.json
    //check the user exist
    //update user
    console.log(req.params);
    const { id } = req.params;
    const { email } = req.body;
    let found = users.find(user => Number(user.id) === Number(id))
    console.log(found);
    if (!found) {
        res.status(404).json({ message: "user not found" });
        return;
    }
    const emailExist = users.find(user => user.email === email);
    if (emailExist) {
        res.status(409).json({ message: "email exist" });
        return;
    }
    Object.assign(found, req.body);
    console.log(users);
    writeFile();
    res.json({ message: "user updated successfully" });
    return;
});



// 3. Create an API that deletes a User by ID. The user id should be retrieved from either 
// the request body or optional params. (1 Grade)
// Note: Remember to delete the user from the file
// o URL: DELETE /user{/:id}

app.delete('/user{/:id}', (req, res, next) => {
    //recieve the data from request 
    //read the file users.json
    //check the user exist
    //delete user
    const { id } = req.params||req.body.id;
    let found = users.find(user => Number(user.id) === Number(id))
    console.log(found);
    if (!found) {
        res.status(404).json({ message: "user not found" });
        return;
    }
    let index = users.findIndex(user => user.id === Number(id));
    users.splice(index, 1);
    writeFile();
    res.json({ message: "user deleted successfully" });
    return;
});


// 4. Create an API that gets a user by their name. The name will be provided as a query parameter. (1 Grade)
// o URL: GET /user/getByName

app.get('/user/getByName', (req, res, next) => {
    const { name } = req.query;
    let found = users.find(user => user.name === name);
    if (!found) {
        res.status(404).json({ message: "user not found" });
        return;
    }
    let people = users.filter(user => user.name === name);
    console.log(people);
    res.json({ users: people })
})

// 5. Create an API that gets all users from the JSON file. (0.5 Grade)
// o URL: GET /user

app.get('/user', (req, res, next) => {
    return res.json({ users: users });

})

// 6. Create an API that filters users by minimum age. (1 Grade)
// o URL: GET /user/filter

app.get('/user/filter', (req, res, next) => {
    const { minAge } = req.query;
    let people = users.filter(user => Number(user.age) > minAge);
    console.log(people);
    if (people.length == 0) {
        res.json({ message: 'no users found' })
        return;
    }
    res.json({ users: people })
    return;
})

// 7. Create an API that gets User by ID. (0.5 Grade)
// o URL: GET /user/:id
// o Output :

app.get('/user/:id', (req, res, next) => {
    const { id } = req.params;
    let found = users.find(user => Number(user.id) === Number(id))
    console.log(found);
    if (!found) {
        res.status(404).json({ message: "user not found" });
        return;
    }
    res.json({ users: found })
    return;
})

app.all('{/*dummy}', (req, res, next) => {
    res.status(404).json('invalid routing');
    return;
})
app.use((error, req, res, next) => {
    res.status(500).json('');
})
app.listen(port, () => {
    console.log(`server is running on port ${port}`);
})
