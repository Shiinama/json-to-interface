import { TypeGroup } from '../model/model';
export declare function isObject(value: any): boolean;
export declare function Hash(content: string): string;
export declare function isArray(value: any): boolean;
export declare function getPrimtiveTypeStr(value: any): "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function" | "null" | "Date";
export declare function isBlooen(value: any): boolean;
export declare function isDate(value: any): boolean;
export declare function getJsonType(Json: any): TypeGroup;
