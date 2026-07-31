// Write a function to find the longest common prefix string amongst an array of strings.

// If there is no common prefix, return an empty string "".

// Example 1:

// Input: strs = ["flower","flow","flight"]
// Output: "fl"
// Example 2:

// Input: strs = ["dog","racecar","car"]
// Output: ""
// Explanation: There is no common prefix among the input strings.


// Constraints:

// 1 <= strs.length <= 200
// 0 <= strs[i].length <= 200
// strs[i] consists of only lowercase English letters if it is non-empty.
var longestCommonPrefix = function (strs) {
    if (strs.length < 1 || strs.length > 200) {
        console.log('invalid array length');
        return;
    }
    else {

        for (let i = 0; i < strs.length; i++) {
            if (strs[i].length > 200 || strs[i].length < 0) {
                console.log('invalid string length');
                return;
            }
            else {
                if (strs[i] === '') {
                    console.log('There is no common prefix among the input strings');
                    return '';
                }
            }
        }
        //f    l    o    w    e     r   = i 0 
        //[00] [01] [02] [03] [04]  [05]
        //f     l      o      w = i 1
        //[10]  [11]   [12]   [13]  
        //f     l      i      g     h    t =i 2
        //[20]  [21]   [22]   [23]  [24]
        let pre = '';
        //i=0;
        for (let i = 0; i < strs[0].length; i++) {//loop on flower
            let prefix = true;
            for (let j = 1; j < strs.length; j++) {
                if (i < strs[j].length) {
                    if (strs[0][i] === strs[j][i]) {
                        continue;
                    }
                    else {
                        prefix = false;
                        break;
                    }
                }
                else {
                    prefix = false;
                    break;
                }
            }
            if (prefix) {
                pre += strs[0][i];
            }
            else {
                break;
            }

        }
        if (pre === '') {
            console.log('There is no common prefix among the input strings');
            return '';
        } else {
            return pre;
        }
    }
}
    ;
console.log(longestCommonPrefix(["flower", "flow", "flight"]));
console.log(longestCommonPrefix(["dog", "racecar", "car"]));
console.log(longestCommonPrefix(["alone"]));



