export declare enum TypeGroup {
    Array = 0,
    Object = 1,
    Primitive = 2
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
export {};
