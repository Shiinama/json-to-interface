/*
 * @Description:
 * @Date: 2022-12-18 16:24:48
 */
import { Hash, isObject } from '../../until/index';
let outArr = [];
let HashValueMap = {};
let HashNameMap = {};
let arrayObjMap = {}; //数组对象重复统计
let isArrayObject = false;
// 处理首字母大写
function capitalize(name: string): string {
  return name.charAt(0).toUpperCase() + name.slice(1);
}
// 处理重复interface value
function repetite(key) {
  let arr = Object.values(HashValueMap).filter(i => i === HashValueMap[key]);
  if (arr.length > 1) {
    return {
      isReped: true,
      // 取首个命名
      key: Object.keys(HashValueMap).find(key => HashValueMap[key] === arr[0])
    };
  } else {
    return { isReped: false, key };
  }
}
// 处理空值判断
function createKey(value, key) {
  if (isArrayObject) {
    let arrayObjMap = {};
  }
  let copyKey = value === null ? `  ${key}?` : '  ' + key;
  return copyKey;
}

function dealObj({ types, key }) {
  let typeStr = '';
  for (let i = 0; i < types.length; i++) {
    typeStr += switchQuoteType(types[i]);
  }
  let interfaceString = `interface ${capitalize(key)} {\n`;
  interfaceString += typeStr;
  interfaceString += '}';
  outArr.push(interfaceString);
}
function dealArray({ types, key, value }) {
  const isObjectArray = value.reduce((a, b) => a && isObject(b), true);
  if (isObjectArray) {
  } else {
    let typeSet = new Set();
    for (let i = 0; i < types.length; i++) {
      if (['Object', 'Array'].includes(types[i].type)) {
        types[i].key = key;
        switchQuoteType(types[i]);
        isArrayObject = true;
        typeSet.add(capitalize(key));
      } else {
        typeSet.add(types[i].type);
      }
    }
    isArrayObject = false;
    let typeStr =
      typeSet.size > 1
        ? '(' + Array.from(typeSet).join(' | ') + ')'
        : Array.from(typeSet).join('|');
    return typeStr;
  }
}

export function switchQuoteType(intermediateData) {
  // 先干掉空格
  intermediateData.key = intermediateData.key.replace(/\s/g, '');
  let { type, key, types, value } = intermediateData;
  switch (type) {
    case 'Object':
      // 处理重复name
      if (HashNameMap[key]) {
        HashNameMap[key]++;
        key = `${key}${HashNameMap[key]}`;
      } else {
        HashNameMap[key] = 1;
      }
      // 仅仅给引用类型添加id
      HashValueMap[key] = Hash(JSON.stringify(intermediateData.value));
      // 处理重复value
      let repetiteObj = repetite(key);
      if (!repetiteObj.isReped) {
        if (!isArrayObject) {
          dealObj({ types, key });
        }
      }
      return `  ${createKey(
        intermediateData.value,
        intermediateData.key
      )}: ${capitalize(repetiteObj.key)}; \n`;
    case 'Array':
      const keyStr = dealArray({ types, key, value });
      return `  ${createKey(
        intermediateData.value,
        intermediateData.key
      )}: ${keyStr}[]; \n`;
    default:
      return `  ${createKey(intermediateData.value, key)}: ${type}; \n`;
  }
}

export function out(midData) {
  HashValueMap = {};
  HashNameMap = {};
  outArr = [];
  switchQuoteType(midData);
  return outArr;
}
