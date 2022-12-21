/*
 * @Description:
 * @Date: 2022-12-18 16:24:48
 */
import { Hash, isObject } from '../../until/index';
let outArr = [];
let HashValueMap = {};
let HashNameMap = {};
function toOptionalKey(key: string): string {
  return key.endsWith('?') ? key : `${key}?`;
}
// 处理首字母大写
function capitalize(name: string): string {
  name = name.endsWith('?') ? name.substring(0, name.length - 1) : name;
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
  let copyKey = value === null ? `  ${toOptionalKey(key)}` : '  ' + key;
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
function margeTypesFn(array, margenLen) {
  const commonObj = {};
  const commonKeys = [];
  const obj = {};
  array.forEach(({ key }) => {
    commonObj[key] ? commonObj[key]++ : (commonObj[key] = 1);
    if (commonObj[key] === margenLen) {
      commonKeys.push(key);
    }
  });
  const result = array.reduce((p, c) => {
    if (obj[c.key]) {
      obj[c.key].type = Array.from(new Set([obj[c.key].type]).add(c.type)).join(
        ' | '
      );
    } else {
      obj[c.key] = c;
      !commonKeys.includes(c.key) && (c.key = `${c.key}?`);
      p.push(c);
    }
    return p;
  }, []);
  return result;
}
function incrementKey(key) {
  let count = 0;
  let originKey = key;
  function fn() {
    console.log(count);
    const newKey = count ? `${originKey}${count}` : originKey;
    count++;
    return newKey;
  }
  return fn;
}
function dealArray({ types, key, value }) {
  const isObjectArray = value.reduce((a, b) => a && isObject(b), true);
  if (isObjectArray) {
    let merageTypes = [];
    let merageValue = {};
    let margenLen = 0;
    for (let i = 0; i < types.length; i++) {
      margenLen++;
      merageTypes.push(...types[i].types);
      Object.assign(merageValue, types[i].value);
    }
    if (merageTypes.length > 0) {
      merageTypes = margeTypesFn(merageTypes, margenLen);
      switchQuoteType({
        type: 'Object',
        types: merageTypes,
        key,
        value: merageValue
      });
    }
    return `${capitalize(key)}[]`;
  } else {
    // 非对象数组的key需要递增
    let KeySet = new Set();
    let increment = incrementKey(key);
    for (let i = 0; i < types.length; i++) {
      if (types[i].type === 'Object') {
        types[i].key = increment();
        KeySet.add(capitalize(types[i].key));
        switchQuoteType(types[i], true);
      } else if (types[i].type === 'Array') {
        types[i].type = 'Object';
        types[i].key = increment();
        KeySet.add(dealArray(types[i]));
      } else {
        KeySet.add(types[i].type);
      }
    }
    increment = null;
    let typeStr = `( ${Array.from(KeySet).join(' | ')} )[]`;
    return typeStr;
  }
}

export function switchQuoteType(intermediateData, needOptimize = false) {
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
      console.log(HashNameMap);
      // 仅仅给引用类型添加id
      HashValueMap[key] = Hash(JSON.stringify(intermediateData.value));
      // 处理重复value
      let repetiteObj = repetite(key);
      if (!repetiteObj.isReped || needOptimize) {
        dealObj({ types, key });
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
      )}: ${keyStr}; \n`;
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
