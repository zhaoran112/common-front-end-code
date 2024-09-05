function twoNum(nums, target) {
  // [1, 2, 3, 4,5, 6, 7, 8]
  nums.sort((a, b) => a - b);
  let l = 0,
    r = nums.length - 1;
  //   console.log(nums, "nums");

  while (l < r) {
    const sum = nums[l] + nums[r];
    if (sum > target) {
      r--;
    }
    if (sum < target) {
      l++;
    }
    if (sum === target) {
      console.log(l, r);
      return;
    }
  }
}
twoNum([1, 2, 3, 4, 5, 6, 7, 8], 7);
