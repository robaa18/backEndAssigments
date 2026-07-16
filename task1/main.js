//1
let x = 7 + Number("123");
console.log({x});


//2
let num = 0;
if (num == false){
    console.log("Invalid");
}


//3
for(let i=0 ; i<=10 ; i++){
    if(i%2!=0){
        console.log({i});
    }else{
        continue;
    }
}


//4

let arr = [1,2,3,4,5,6,7,8,9];
console.log(arr.filter((number , index , array) => number%2==0));


//5

function merge (){
let arr1 = [1,2,3,4];
let arr2 = [5,6,7,8];
return [...arr1,...arr2];
}
console.log(merge());

//6
let day = 2;
switch(day){
    case 1 : console.log("sunday");
    break;
    case 2 : console.log("monday");
    break;
    case 3 : console.log("tuesday");
    break;
    case 4 : console.log("wednesday");
    break;
    case 5 : console.log("thursday");
    break;
    case 6 : console.log("friday");
    break;
    case 7 : console.log("saturday");
    break;
    default : console.log("Invalid day");
}


//7

let arr1 = ["a","ab","abnkif","abc"];
let lengths = arr1.map((e,index)=>{
    return e.length ;
}) 
console.log(lengths);


//8
function isNumberDisibleBy3And5(num){
    return num%3===0 && num%5===0 ? "Yes it is divisible by 3 and 5" : "No it is not divisible by 3 and 5";
}
let result1 =isNumberDisibleBy3And5(15);
console.log({result1});
let result2 =isNumberDisibleBy3And5(14);
console.log({result2});


//9

let square = (n)=>n *= n ;
console.log(square(3));


//10

let user = {
    userName : "roba" ,
    age : 20 ,
    gender : "female"
};

function destructingObject({userName ,age}={}){
    return `your name is ${userName} and your age is ${age}`
}

console.log(destructingObject(user));


//11

function sumNumbers(...numbers) {
    let sum = 0 ;
    for(let i = 0 ; i< numbers.length ; i++){
        sum += numbers[i];
    }
    return sum ;
}
console.log(sumNumbers(1,2,3,4,5));


//12

function success(){
     return new Promise((resolve)=>{
          setTimeout(() => {
            resolve("Success");
          },3000);  
        })
}

async function execute() {
    const res = await success(); 
    console.log(res);
}
execute();


//13

function largestNumberInArray(array){
    let max = 0 ;
    for(let i =0 ; i < array.length ; i++){
        if(array[i]>max){
            max=array[i];
        }
        else
            {continue;}
    }
    return max ;
}
console.log(largestNumberInArray([1,6,8,12,0,200]));


//14

function returnObjectKeys(yourObject){
    return Object.keys(yourObject);
}
console.log(returnObjectKeys({
    name:"roba",
    age:"20",
    gender:"female"
}));


//15

function splitStringOnSpaces (phrase){
    return phrase.split(" ");
}
console.log(splitStringOnSpaces("i luv javaScipt"));



