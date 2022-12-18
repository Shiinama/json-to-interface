/*
 * @Description:
 * @Date: 2022-12-12 19:26:05
 */
import { TypeGroup, finallyOptions } from '../../model/model';
import { getPrimtiveTypeStr, getJsonType } from '../../until/index';

function dealArray(obj) {}
function dealObj(obj) {
  const seprateArr = Object.entries(obj).reduce((pre, [key, value]) => {
    const { types, type } = getTypesValue(value);
    let param = {
      type,
      types,
      key,
      value
    };
    pre.push(param);
    return pre;
  }, []);
  return seprateArr;
}

// 检测器，类型的处理器
export function getTypesValue(value: any, option?: finallyOptions) {
  const valueBtype = getJsonType(value);
  let typeValue;
  switch (valueBtype) {
    case TypeGroup.Array:
      typeValue = dealObj(value);
      return {
        type: 'Array',
        types: typeValue
      };
    case TypeGroup.Object:
      typeValue = dealObj(value);
      return {
        type: 'Object',
        types: typeValue
      };
    case TypeGroup.Primitive:
      typeValue = getPrimtiveTypeStr(value);
      return {
        type: typeValue
      };
  }
}
