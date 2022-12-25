/*
 * @Description:
 * @Date: 2022-12-12 17:41:07
 */
const JsonToTS = require('./build/packages/core/src/index').default;

let json = {
  a: []
};
debugger;
const data = JsonToTS(json);

data.forEach(item => {
  console.log(item);
});
