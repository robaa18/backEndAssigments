// Input: arr = [1,2,3,4], k = 2
// Output: 6
// Explanation: The missing positive integers are [5,6,7,...]. The 2nd missing positive integer is 6.

const { log } = require("node:console");

// Input: arr = [2,3,4,7,11], k = 5
// Output: 9
// Explanation: The missing positive integers are [1,5,6,8,9,10,12,13,...]. The 5th missing positive integer is 9.
var findKthPositive = function(arr, k) {
    if(k>=1 && k<=1000 && arr.length<=1000 && arr.length>=1 ){
        let flag = true ;
        for (let i = 0; i < arr.length; i++) {
            if(arr[i]<1 || arr[i]>1000){
                flag = false ;
                break;
            };   
            continue;
        }
        if(flag){
            let missings = [];  
            for (let i = 0; i < arr.length; i++) {
                    if(arr[i]==1){
                        if(i != arr.length-1){
                            if(arr[i+1]!=arr[i]+1){ 
                                for (let number = arr[i] ; number <arr[i+1]-1; ) {
                                    ++number;
                                    missings.push(number);  
                                }
                            }else{
                                continue;
                            }
                        }
                    }
                    else{
                        if(i==0){
                            for (let number = 0 ; number<arr[i]-1; ) {
                                ++number;
                                missings.push(number);  
                            }

                            if(i != arr.length-1){
                                if(arr[i+1]!=arr[i]+1){ 
                                    for (let number = arr[i] ; number <arr[i+1]-1; ) {
                                        ++number;
                                        missings.push(number);  
                                    }    
                                }else{
                                    continue;
                                } 
                            }
                        }
                        else{
                            if(i != arr.length-1){
                                if(arr[i+1]!=arr[i]+1){ 
                                    for (let number = arr[i] ; number <arr[i+1]-1; ) {
                                        ++number;
                                        missings.push(number);  
                                    }    
                                }
                                else{
                                    continue;
                                }
                            }
                        }
                    } 
            }

            for (let j = arr[arr.length-1]; j<1000; ) {
                ++j;
                missings.push(j);
            }

            return missings[k-1]; 
        }else{
            console.log('bad array');
            return;
        }  
    }else{
        console.log('invalid inputs');
        return;
    }
};

console.log(findKthPositive([2,3,4,7,11],5)); // 9
console.log(findKthPositive([1,2,3,4],2));    // 6

