/*
 * @Description:
 * @Date: 2022-12-12 19:29:31
 */

declare type JsonTypes<T> = T | null;

export enum TypeGroup {
  Array,
  Object,
  Primitive
}

declare type DefaultOption = {
  fKey: string;
};

export interface finallyOptions extends DefaultOption {
  fkey?: string;
}

const json: OriginKey = {
  arr: [{ a: 1, b: 2 }, { g: 1, d: 2 }, [1, { a: 1, b: 2 }]]
};

interface Arr0 {
  a: number;
  b: number;
}
interface Arr1 {
  g: number;
  d: number;
}
interface Arr21 {
  a: number;
  b: number;
}
interface OriginKey {
  arr: (Arr0 | Arr1 | (number | Arr21)[])[];
}
