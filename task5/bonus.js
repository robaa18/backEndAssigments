var removeElement = function (nums, val) {
  if (nums.length > 100 || val < 0 || val > 100) {
    console.log("invalid inputs");
    return;
  } else {
    let k = nums.length;
    let valArray = [];
    for (let i = nums.length - 1; i >= 0; i--) {
      //i=3 [3,2,2,3x]
      //i=2 [3,2,2]
      //i=1 [3,2,2]
      //i=0 [3,2,2]
      //[2,2]
      if (nums[i] < 0 || nums[i] > 50) {
        console.log("invalid inputs");
        return;
      } else if (nums[i] == val) {
        valArray.push(nums[i]);
        nums.splice(i, 1);
        k--;
      } else {
        continue;
      }
    }
    nums.push(...valArray);
    return { k: k, nums: nums };
  }
};
let result1 = removeElement([3, 2, 2, 3], 3);
console.log(result1);
let result2 =removeElement([0, 1, 2, 2, 3, 0, 4, 2], 2);
console.log(result2);