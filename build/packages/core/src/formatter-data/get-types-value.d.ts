import { finallyOptions } from '../../model/model';
export declare function getTypesValue(value: any, option?: finallyOptions): {
    type: string;
    types: any;
} | {
    type: any;
    types?: undefined;
};
