const { error } = require('node:console');
let fs = require('node:fs');
let path = require("node:path");
const { describe } = require('node:test');
let { EventEmitter }=require('node:events');
const { setDefaultHighWaterMark } = require('node:stream');
let event = new EventEmitter();


// 1. Write a function that logs the current file path and directory.(0.5 Grade)
// • Output Example: {File: “/home/user/project/index.js”, Dir: “/home/user/project”}

function logPath() {
    console.log({Dir:__dirname , File:__filename});
}
logPath();


// 2. Write a function that takes a file path and returns its file name.(0.5 Grade)
// • Input Example: /user/files/report.pdf
// • Output Example:"report.pdf "

function fileName(filePath) {
    console.log(path.basename(filePath));
}
fileName(__filename);


// 3. Write a function that builds a path from an object (0.5 Grade)
// • Input Example:{ dir:"/folder", name:"app", ext:".js"}
// • Output Example: “/folder/app.js”

let pathObject = {
  root: 'C:\\',
  dir: 'C:\\Users\\DELL\\Downloads\\Route\\assigments\\task2',
  base: 'main.js',
  ext: '.js',
  name: 'main'
}

function buildPath(obj) {
    return path.format(obj);
}
console.log(buildPath(pathObject));


// 4. Write a function that returns the file extension from a given file path.(0.5 Grade)
// • Input Example: /docs/readme.md"
// • Output Example: “.md”

function fileExtension(filePath) {
    console.log(path.extname(filePath));
}
fileExtension(__filename);


// 5 Write a function that parses a given path and returns its name and ext.(0.5 Grade)
// • Input Example: /home/app/main.js
// • Output Example:{Name: “main”, Ext:“.js”}

function fileParse(filePath) {
   let obj = path.parse(filePath);
    return {name:obj.name, ext :obj.ext};
}
console.log(fileParse(__filename));


// 6. Write a function that checks whether a given path is absolute.(0.5 Grade)
// • Input Example: /home/user/file.txt
// • Output Example: true

function isAbsolute(filePath) {
   return path.isAbsolute(filePath);
}
console.log(isAbsolute(__filename));


// 7. Write a function that joins multiple segments (0.5 Grade)
// • Input:"src","components", "App.js"
// • Output Example: src/components/App.js

function joinSegments(...paths) {
    return path.join(...paths)
}
console.log(joinSegments('src' , 'components' ,'App.js'));


// 8. Write a function that resolves a relative path to an absolute one.(0.5 Grade)
// • Input Example: ./index.js
// • Output Example: /home/user/project/src/index.js

function resolveToAbsolute(filePath) {
   return path.resolve(filePath);
}
console.log(resolveToAbsolute('./index.js'));


// 9. Write a function that joins two paths.(0.5 Grade)
// • Input Example: /folder1, folder2/file.txt
// • Output Example: /folder1/folder2/file.txt

function joinTwoPaths(path1,path2) {
   return path.join(path1,path2);
}
console.log(joinTwoPaths('/folder1','folder2/file.txt'));



// 10. Write a function that deletes a file asynchronously.(0.5 Grade)
// • Input Example: /path/to/file.txt
// • Output Example: The file.txt is deleted.

let filPath = path.resolve('./task02/file.txt')
function deleteFile(path) {
    let stat = fs.stat(filPath,(error,stats)=>{
        if(error){
            console.log(error.message);
            return;
        }
        else{
            fs.unlink(filPath,(err)=>{
                if(err) return console.log(err);
                else return console.log('The file.txt is deleted.'); 
            })            
        }
    })

}
deleteFile(filPath);

// 11. Write a function that creates a folder synchronously.(0.5 Grade)
// • Output Example: “Success”

let destPath = path.resolve('./task02')
function createFolder(path) {
    try {
        fs.mkdirSync(path,{recursive:true});
        console.log('success');
    } catch (error) {
        console.log(error.message);
    }     
}
createFolder(destPath);


// 12. Create an event emitter that listens for a "start" event and logs a welcome message.(0.5 Grade)
// • Output Example: Welcome event triggered!

event.on('start',()=>{
    console.log('Welcome event triggered!');
})
event.emit('start');


// 13. Emit a custom "login" event with a username parameter.(0.5 Grade)
// • Input Example: "Ahmed"
// • Output Example:“User logged in: Ahmed”

event.on('login',(username)=>{
    console.log(`User logged in:${username}`);
    
})
event.emit('login','ahmed');


// 14. Read a file synchronously and log its contents.(0.5 Grade)
// • Input Example: "./notes.txt"
// • Output Example: the file content => “This is a note.”

let filePath = path.resolve('./notes.txt');
try {
    const fileContent = fs.readFileSync(filePath,'utf-8');
    console.log(fileContent);
} catch (error) {
    console.log(error.message);
    
}


// 15. Write asynchronously to a file.(0.5 Grade)
// • Input: path: "./async.txt", content: "Async save"

let filePath = path.resolve('./async.txt');
fs.writeFile(filePath , '\nAsync save' , {flag:'a'}, (error)=>{
    if (error){
        console.log({error});
        return; 
    }
    console.log('content saved successfully');
    
})


// 16. Check if a directory exists. (0.5 Grade)
// • Input Example: "./notes.txt"
// • Output Example: true

let folderPath = path.resolve('./','../','./task1');
function checkTheDirectory(path){
    try {
        let stats=fs.statSync(path);
        if(!stats.isDirectory()){
            console.log('not a dir');
            return;
        }       
        console.log('true');
        
    } catch (error) {  
        console.log(error.message);
    }


}
checkTheDirectory(folderPath);

// another answer

let folderPath = path.resolve('./','../','./task1');
function checkTheDirectory(path){
    try {
        console.log(fs.existsSync(path));  
    } catch (error) {  
        console.log(error.message);
    }
}
checkTheDirectory(folderPath);

// 17. Write a function that returns the OS platform and CPU architecture. (0.5 Grade)
// • Output Example: {Platform: “win32”, Arch: “x64”}

const os = require("node:os");

function getSystemInfo() {
    return {
        Platform: os.platform(),
        Arch: os.arch()
    };
}

console.log(getSystemInfo());


console.log({Platform:os.platform(),arch:os.arch()});
// 18. Use a readable stream to read a file in chunks and log each chunk. (0.5 Grade)
// • Input Example: "./big.txt"
// • Output Example: log each chunk

const source = path.resolve('./big.txt');
const readStream = fs.createReadStream(source , {encoding:'utf-8',highWaterMark:500});
readStream.on('data',(chunck)=>{
    console.log({chunck});
})

// 19. Use readable and writable streams to copy content from one file to another. (0.5 Grade)
// • Input Example: "./source.txt", "./dest.txt"
// • Output Example: File copied using streams

const source = path.resolve("./big.txt");
const destination = path.resolve("./dest.txt");
const readStream = fs.createReadStream(source,{highWaterMark:500});
const writeStream = fs.createWriteStream(destination);
readStream.on('data',(chunck)=>{
    writeStream.write(chunck);
    console.log({chunck});
})
readStream.pipe(writeStream);

writeStream.on("finish", () => {
    console.log("File copied using streams");
});

writeStream.on("error", (err) => {
    console.log(err.message);
});


// 20. Create a pipeline that reads a file, compresses it, and writes it to another file. (0.5 Grade)
// • Input Example: "./data.txt", "./data.txt.gz"
const source = path.resolve("./big.txt");
const destination = path.resolve("./dest.txt.gz");
const readStream = fs.createReadStream(source,{highWaterMark:500});
const writeStream = fs.createWriteStream(destination);
const {createGzip}=require('node:zlib');
const { loadavg } = require('node:os');
const zip = createGzip();
readStream.pipe(zip).pipe(writeStream);
readStream.on('error',(error)=>{
    console.log({error});
})
writeStream.on('error',(error)=>{
    console.log({error});
    
})
readStream.on('end',()=>{
    console.log('success read');
    
})
writeStream.on('finish',()=>{
    console.log('success write');
    
})
zip.on('error',(error)=>{
    console.log(error);
    
})

readStream.pipe(writeStream);
const zlib = require("node:zlib");
const { pipeline } = require("node:stream");

const source = path.resolve("./big.txt");
const destination = path.resolve("./data.txt.gz");

pipeline(
    fs.createReadStream(source),
    zlib.createGzip(),
    fs.createWriteStream(destination),

    (err) => {
        if (err) {
            console.log(err.message);
            return;
        }

        console.log("File compressed successfully");
    }
);