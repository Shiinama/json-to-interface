/*
 * @Description:
 * @Date: 2022-12-12 16:29:59
 */
import { getJsonType } from '../until';
import { TypeGroup, finallyOptions } from '../model/model';
import { getTypesValue } from './formatter-data/get-types-value';
import { out } from './ts-interface/create-interface';
import { shim } from 'es7-shim/es7-shim';
shim();
const defaultOptions = {
  fKey: 'originKey'
};
export default function JsonToTS<JsonTypes>(
  json: JsonTypes,
  options?: finallyOptions
): string[] {
  const finallyOptions = {
    ...defaultOptions,
    ...options
  };

  const JsonType = getJsonType(json);

  if (JsonType === TypeGroup.Primitive) {
    throw new Error('仅支持对象和数组');
  }
  // 返回数组结构的types
  const typesValue = getTypesValue(json, finallyOptions);
  typesValue['key'] = finallyOptions.fKey;
  const data = out(typesValue);
  return data;
}

JsonToTS.default = JsonToTS;
module.exports = JsonToTS;
