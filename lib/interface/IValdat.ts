import { IData } from './common';
import { IValidateString } from './IValidateString';

export interface IValdat {
    check(schema: IData, data: IData): {
        isValid: boolean;
        errors: IData;
    };
    register(name: string, method: Function): Function;
    custom(validator: Function): {
        stack: Function[];
    };
    string(): IValidateString;
    [propName: string]: Function;
}