/*
 * @Description:
 * @Date: 2022-12-12 16:29:59
 */
import { isObject } from '../until';
import { finallyOptions } from '../model/model';
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

  if (!isObject(json)) {
    throw new Error('Only Object are supported');
  }
  // 返回数组结构的types
  const typesValue = getTypesValue(json);
  typesValue['key'] = finallyOptions.fKey;
  const data = out(typesValue);
  return data;
}

JsonToTS.default = JsonToTS;
module.exports = JsonToTS;
