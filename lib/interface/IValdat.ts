import { IData } from './common';
import { IValidateString } from './IValidateString';
import { IValidateNumber } from './IValidateNumber';
import { IValidateObject } from './IValidateObject';
import { IValidateArray } from './IValidateArray';
import { IValidateEnum } from './IValidateEnum';

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
    object(): IValidateObject;
    array(): IValidateArray;
    enum(): IValidateEnum;
    [propName: string]: Function;
}