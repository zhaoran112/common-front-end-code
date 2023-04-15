function add(num1, num2) {
    return Number(math.add(math.bignumber(num1), math.bignumber(num2)));
}
// 乘
function multiply(num1, num2) {
    return Number(math.multiply(math.bignumber(num1), math.bignumber(num2)));
}
// 减
function subtract(num1, num2) {
    return Number(math.subtract(math.bignumber(num1), math.bignumber(num2)));
}
// 除
function divide(num1, num2) {
    return Number(math.divide(math.bignumber(num1), math.bignumber(num2)));
}

console.log(add(0.1, 0.2));
console.log(multiply(1.15, 100));
console.log(divide(3, 9));