// // Part2: Simple CRUD Operations Using HTTP (5 Grades)
// // • For all the following APIs, you must use the fs module to read and write data from a JSON file (e.g., users.json).
// // • Do not store or manage data using arrays
// const http = require("node:http");
// const fs = require("node:fs");
// const path = require("node:path");

// const PORT = 3000;
// const filePath = path.resolve("./users.json");

// const server = http.createServer((req, res) => {

//     res.setHeader("Content-Type", "application/json");

// // 1)Create an API that adds a new user to your users stored in a JSON file (1 Grade)
// // (ensure that the email of the new user doesn’t exist before)
// // o URL: POST /user

    // if (req.method === "POST" && req.url === "/user") {

    //     let body = "";

    //     req.on("data", (chunk) => {
    //         body += chunk;
    //     });

    //     req.on("end", () => {

    //         let newUser;

    //         try {
    //             newUser = JSON.parse(body);
    //         } catch (error) {
    //             res.statusCode = 400;
    //             res.end(JSON.stringify({
    //                 message: "Invalid JSON"
    //             }));
    //             return;
    //         }

    //         fs.readFile(filePath, "utf8", (error, data) => {

    //             if (error) {
    //                 res.statusCode = 500;
    //                 res.end(JSON.stringify({
    //                     message: "Error Reading File"
    //                 }));
    //                 return;
    //             }

    //             let users = JSON.parse(data);

    //             const found = users.find((user) => {
    //                 return user.email === newUser.email;
    //             });

    //             if (found) {
    //                 res.statusCode = 400;

    //                 res.end(JSON.stringify({
    //                     message: "Email already exists."
    //                 }));

    //                 return;
    //             }

    //             newUser.id = users.length + 1;

    //             users.push(newUser);

    //             fs.writeFile(
    //                 filePath,
    //                 JSON.stringify(users, null, 2),
    //                 (error) => {

    //                     if (error) {

    //                         res.statusCode = 500;

    //                         res.end(JSON.stringify({
    //                             message: "Error Writing File"
    //                         }));

    //                         return;
    //                     }

    //                     res.statusCode = 201;
    //                     res.end(JSON.stringify({
    //                         message: "User added successfully."
    //                     }));

    //                 });

    //         });

    //     });

    

// // 2)Create an API that updates an existing user's name, age, or email by their ID. The user ID should be retrieved
// // from the URL (1 Grade)
// // Note: Remember to update the corresponding values in the JSON file
// // o URL: PATCH /user/id

//     else if (req.method === "PATCH" && req.url.startsWith("/user/")) {

//         const id = Number(req.url.split("/")[2]);

//         let body = "";

//         req.on("data", (chunk) => {
//             body += chunk;
//         });

//         req.on("end", () => {

//             let updatedData;

//             try {
//                 updatedData = JSON.parse(body);
//             } catch (error) {
//                 res.statusCode = 400;
//                 res.end(JSON.stringify({
//                     message: "Invalid JSON"
//                 }));
//                 return;
//             }

//             fs.readFile(filePath, "utf8", (error, data) => {

//                 if (error) {

//                     res.statusCode = 500;

//                     res.end(JSON.stringify({
//                         message: "Error Reading File"
//                     }));

//                     return;
//                 }

//                 let users = JSON.parse(data);

//                 const user = users.find((user) => user.id === id);

//                 if (!user) {

//                     res.statusCode = 404;

//                     res.end(JSON.stringify({
//                         message: "User ID not found."
//                     }));

//                     return;
//                 }

//                 if (updatedData.name !== undefined) {
//                     user.name = updatedData.name;
//                 }

//                 if (updatedData.age !== undefined) {
//                     user.age = updatedData.age;
//                 }

//                 if (updatedData.email !== undefined) {
//                     user.email = updatedData.email;
//                 }

//                 fs.writeFile(
//                     filePath,
//                     JSON.stringify(users, null, 2),
//                     (error) => {

//                         if (error) {

//                             res.statusCode = 500;

//                             res.end(JSON.stringify({
//                                 message: "Error Writing File"
//                             }));

//                             return;
//                         }

//                         res.statusCode = 200;

//                         res.end(JSON.stringify({
//                             message: "User updated successfully."
//                         }));

//                     });

//             });

//         });

//     }
//  // 3)Create an API that deletes a User by ID. The user id should be retrieved from the URL (1 Grade)
// // Note: Remember to delete the user from the file
// // o URL: DELETE /user/id

// else if (req.method === "DELETE" && req.url.startsWith("/user/")) {

//     const id = Number(req.url.split("/")[2]);

//     fs.readFile(filePath, "utf8", (error, data) => {

//         if (error) {

//             res.statusCode = 500;

//             res.end(JSON.stringify({
//                 message: "Error Reading File"
//             }));

//             return;
//         }

//         let users = JSON.parse(data);

//         const user = users.find((user) => user.id === id);

//         if (!user) {

//             res.statusCode = 404;

//             res.end(JSON.stringify({
//                 message: "User ID not found."
//             }));

//             return;
//         }

//         users = users.filter((user) => {
//             return user.id !== id;
//         });

//         fs.writeFile(
//             filePath,
//             JSON.stringify(users, null, 2),
//             (error) => {

//                 if (error) {

//                     res.statusCode = 500;

//                     res.end(JSON.stringify({
//                         message: "Error Writing File"
//                     }));

//                     return;
//                 }

//                 res.end(JSON.stringify({
//                     message: "User deleted successfully."
//                 }));

//             }
//         );

//     });

// }
// // 4)Create an API that gets all users from the JSON file. (1 Grade)
// // o URL: GET /user

// else if (req.method === "GET" && req.url === "/user") {

//     fs.readFile(filePath, "utf8", (error, data) => {

//         if (error) {

//             res.statusCode = 500;

//             res.end(JSON.stringify({
//                 message: "Error Reading File"
//             }));

//             return;
//         }

//         res.statusCode = 200;
//         res.end(data);

//     });

// }
// // 5)Create an API that gets User by ID. (1 Grade)
// // o URL: GET /user/id

// else if (req.method === "GET" && req.url.startsWith("/user/")) {

//     const id = Number(req.url.split("/")[2]);

//     fs.readFile(filePath, "utf8", (error, data) => {

//         if (error) {

//             res.statusCode = 500;

//             res.end(JSON.stringify({
//                 message: "Error Reading File"
//             }));

//             return;
//         }

//         const users = JSON.parse(data);

//         const user = users.find((user) => {
//             return user.id === id;
//         });

//         if (!user) {

//             res.statusCode = 404;

//             res.end(JSON.stringify({
//                 message: "User not found."
//             }));

//             return;
//         }

//         res.statusCode = 200;
//         res.end(JSON.stringify(user));

//     });

// }

//     else {

//         res.statusCode = 404;

//         res.end(JSON.stringify({
//             message: "Route Not Found"
//         }));

//     }

// });


// server.listen(PORT, () => {
//     console.log(`Server Running On Port ${PORT}`);
// });

let path = require('node:path');
let fs = require('node:fs');
let http = require('node:http');
const { error } = require('node:console');
const { json } = require('node:stream/consumers');
let port =3000;
let dest = path.resolve('./users.json')
let httpServer=http.createServer((req,res)=>{
    let {url , method}=req;
    res.setHeader("Content-Type", "application/json");
// // 1)Create an API that adds a new user to your users stored in a JSON file (1 Grade)
// // (ensure that the email of the new user doesn’t exist before)
// // o URL: POST /user
    if(url=='/user' && method == 'POST'){
        let newUser = '';
        req.on('data',(chunck)=>{
            newUser+=chunck;
            console.log({chunck});
        })
        req.on('end',()=>{
            try {
                newUser=JSON.parse(newUser);
                console.log(newUser);
            } catch (error) {
                res.statusCode=400;
                res.end('invalid JSON');
                return;
            }
            let {email}=newUser;
            let users = [];
            fs.readFile(dest,'utf-8',(error , data)=>{
                if (error) {
                    console.log(error.message);
                    res.statusCode = 500;
                    res.end("Internal Server Error");
                    return;
                }
                users=JSON.parse(data);
                console.log(users);
                let found = false;
            users.find((user)=>{
                if (user.email === email) {
                   found=true;
                }
                })
                if (found) {
                     console.log('user already exist');
                    res.statusCode=409;
                    res.end(JSON.stringify({MESSAGE :'USER ALREADY EXIST'}));
                    return;
                }else{
                    newUser.id= users.length+1;
                    users.push(newUser);
                    fs.writeFile(dest ,JSON.stringify(users, null, 2),(error)=>{
                        if (error) {
                        console.log(error.message);
                        res.statusCode = 500;
                        res.end("Internal Server Error");
                        }else{
                            console.log('user added successfully');
                            res.statusCode = 201;
                            res.end(JSON.stringify({MESSAGE :'USER ADDED SUCESSFULLY'}));
                        } 
                        return;
                    })
                }
            

        });

        })
    }

});
httpServer.on('error',(error)=>{
    console.log(error.message);
})
httpServer.listen(port,()=>{
    console.log('server is running on port 3000');   
})