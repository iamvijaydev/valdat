import { IData } from './common';
import { IValidateString } from './IValidateString';
import { IValidateNumber } from './IValidateNumber';

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
    number(): IValidateNumber;
    object(): IValidateString;
    array(): IValidateString;
    enum(): IValidateString;
    [propName: string]: Function;
}