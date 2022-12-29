/*
 * @Description:
 * @Date: 2022-12-12 16:29:59
 */
import { isObject } from '../until';
import { finallyOptions } from '../model/model';
import { getTypesValue } from './formatter-data/get-types-value';
import { out } from './ts-interface/create-interface';
import { shim } from 'es7-shim/es7-shim';
import { parse } from '@babel/parser';

shim();
const defaultOptions = {
  fKey: 'originKey'
};
export default function JsonToTS(
  json: any,
  options?: finallyOptions
): string[] {
  const finallyOptions = {
    ...defaultOptions,
    ...options
  };
  let comments,
    newJson = JSON.parse(JSON.stringify(json));
  if (typeof newJson === 'string') {
    //筛选出注释数据
    comments = parse(`let ${finallyOptions.fKey} = ${newJson}`, {
      sourceType: 'unambiguous'
    });
    //去掉注释
    let reg =
      /("([^\\\"]*(\\.)?)*")|('([^\\\']*(\\.)?)*')|(\/{2,}.*?(\r|\n|$))|(\/\*(\n|.)*?\*\/)/g;
    try {
      newJson = JSON.parse(
        newJson.replace(reg, function (value) {
          return /^\/{2,}/.test(value) || /^\/\*/.test(value) ? '' : value;
        })
      );
    } catch {
      throw new Error('Non-standard  Json format | 非标准JSON格式');
    }
  }
  if (!isObject(newJson)) {
    throw new Error('Only Object are supported | 仅支持对象');
  }
  // 返回数组结构的types
  const typesValue = getTypesValue(newJson);
  typesValue['key'] = finallyOptions.fKey;
  const data = out(typesValue);
  return data;
}

JsonToTS.default = JsonToTS;
module.exports = JsonToTS;
