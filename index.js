/*
 * @Description:
 * @Date: 2022-12-12 17:41:07
 */
const JsonToTS = require('./build/packages/core/src/index').default;

const json = {
  arr: [
    { a: 1, b: 2 },
    { g: 1, b: 2 },
    { a: 1, b: 2 }
  ]
};
debugger;
const data = JsonToTS(json);

data.forEach(item => {
  console.log(item);
});
