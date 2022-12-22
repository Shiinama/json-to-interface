/*
 * @Description:
 * @Date: 2022-12-12 17:41:07
 */
const JsonToTS = require('./build/packages/core/src/index').default;

let json = {
  a: {
    a: 1,
    b: 2
  },
  c: {
    d: 1,
    g: 2
  }
};
debugger;
const data = JsonToTS(json);

data.forEach(item => {
  console.log(item);
});
