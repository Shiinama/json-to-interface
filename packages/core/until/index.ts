/*
 * @Description:
 * @Date: 2022-12-12 19:12:51
 */
import { TypeGroup } from '../model/model';
export function isObject(value) {
  return (
    Object.prototype.toString.call(value) === '[object Object]' &&
    value !== null
  );
}

export function isArray(value) {
  return Object.prototype.toString.call(value) === '[object Array]';
}

export function getPrimtiveTypeStr(value) {
  if (value === null) {
    return 'null';
  } else if (isDate(value)) {
    return 'Date';
  } else {
    return typeof value;
  }
}

export function isBlooen(value) {
  return Object.prototype.toString.call(value) === '[object Boolean]';
}

export function isDate(value) {
  return value instanceof Date;
}

export function getJsonType(Json) {
  if (isObject(Json)) {
    return TypeGroup.Object;
  } else if (isArray(Json)) {
    return TypeGroup.Array;
  } else {
    return TypeGroup.Primitive;
  }
}
