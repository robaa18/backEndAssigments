// I = 1
// V = 5
// X = 10
// L = 50
// C = 100
// D = 500
// M = 1000
//I-->string
// s = "MCMXCIV" ---> 1994

var romanToInt = function (s) {
//[1000,100,1000,10,100,1,5] //0+1000 +900 +90 +4
  const values = {
  I: 1,
  V: 5,
  X: 10,
  L: 50,
  C: 100,
  D: 500,
  M: 1000
};
  let number = 0;
  for (let i = 0; i < s.length; i++) {
    if (values[s[i+1]]!==undefined && values[s[i]] < values[s[i + 1]]) {
      number = number + (values[s[i + 1]] - values[s[i]]);
      i++;
    } else {
      number = number + values[s[i]];
    }
  }
  return number;
};
let result = romanToInt("MCMXCIV");
console.log(result);
let result2 = romanToInt("VIII");
console.log(result2);
let result3 = romanToInt("XC");
console.log(result3);
let result4 = romanToInt("MMMCMXCIX");
console.log(result4);
