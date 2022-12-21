/*
 * @Description:
 * @Date: 2022-12-12 17:41:07
 */
const JsonToTS = require('./build/packages/core/src/index').default;

let json = {
  a: 1,
  b: 2,
  arr: [
    { a: 1, b: 3 },
    { d: 5, h: 6 }
  ]
};
debugger;
const data = JsonToTS(json);

data.forEach(item => {
  console.log(item);
});
