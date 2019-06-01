//=============字符串去重===================
// let readline = require('readline');
// rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });
// rl.question('请输入一串字符串:', (inStr) => {
//     let arr = inStr.split('');
//     let arrs = [];
//     for (let i = 0; i < arr.length; i++) {
//         arrs.indexOf(arr[i]) < 0 && arrs.push(arr[i]);
//     }
//     let strs = '';
//     arrs.forEach((i, item) => {
//         strs += i;
//     });
//     console.log(strs);
// });

let char = '  asdkjasdl kjasdl kasjkldajlksd  ';
let space = /\w/g;
console.log(char.replace(space,'_'));
console.log(char);



//=============数组简单去重======================
// let arr = ['a', 1, '1', '222', 'a', 'b', 'b', '1', 222];
// let arr2 = [];
// arr.forEach((item) => {
//     arr2.indexOf(item) < 0 && arr2.push(item);//准确去重
//     // arr2.forEach((items, index) => { //模糊去重
//     //     items == item && arr2.splice(index);
//     // })
//     // arr2.push(item);
// });
// console.log(arr2);

//=============数组速度去重=======================
// let arr = ['a', 1, '1', '222', 'a', 'b', 'b', '1', 222];
// let obj = {};
// arr.forEach((item, i) => {
//     if (obj[item]) {
//         obj[item].count++;
//     } else {
//         obj[item] = {value :item,count:1};
//     }
//     console.log(obj);
// });

//===============bind call apply===================
// let arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
// let arr2 = '我是个数组';
//
// function toStrings(aaa) {
//     return arguments;
// }
//
// let fu = {
//     fun: toStrings.bind(arr,0,2,3,4,5)
// };
//
// console.log(fu.fun(arr2));

