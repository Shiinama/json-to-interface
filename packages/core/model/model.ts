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

export interface optionsData {
  key: string;
  type: string;
  value: any;
  types?: optionsData[];
}
