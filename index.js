/*
 * @Description:
 * @Date: 2022-12-12 17:41:07
 */
const JsonToTS = require('./build/packages/core/src/index').default;

const json = {
  a: 1,
  c: {
    b: 1,
    c: 2
  },
  arr: [42, 32, 1, { a: 1 }, { b: 2 }]
};
debugger;
const data = JsonToTS(json);

data.forEach(item => {
  console.log(item);
});
