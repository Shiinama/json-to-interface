/*
 * @Description:
 * @Date: 2022-12-18 16:24:48
 */

let outArr = [];
// 处理首字母大写
function capitalize(name: string): string {
  return name.charAt(0).toUpperCase() + name.slice(1);
}

function createKey(value, key) {
  let copyKey = value === null ? `  ${key}?` : '  ' + key;
  return copyKey;
}

function dealObj({ types, key, type }) {
  let typeStr = '';
  for (let i = 0; i < types.length; i++) {
    typeStr += switchQuoteType(types[i]);
  }
  let interfaceString = `interface ${capitalize(key)} {\n`;
  interfaceString += typeStr;
  interfaceString += '}';
  outArr.push(interfaceString);
}

export function switchQuoteType(intermediateData) {
  const { types, type, key } = intermediateData;
  switch (type) {
    case 'Object':
      dealObj(intermediateData);
      return `  ${createKey(intermediateData.value, key)}: ${capitalize(
        key
      )}; \n`;
    case 'Array':

    default:
      return `  ${createKey(intermediateData.value, key)}: ${type}; \n`;
  }
}

export function out(JSON) {
  switchQuoteType(JSON);
  return outArr;
}
