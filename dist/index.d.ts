import Validate, { IValidate, IData, IValidator } from './Validate';
import { IValidateString } from './ValidateString';
import { IValidateNumber } from './ValidateNumber';
import { IValidateBoolean } from './ValidateBoolean';
import { IValidateObject } from './ValidateObject';
import { IValidateArray } from './ValidateArray';
import { IValidateEnum } from './ValidateEnum';
export interface Ivaldat {
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
    boolean(): IValidateBoolean;
    object(): IValidateObject;
    array(): IValidateArray;
    oneOf(types: any[]): IValidateEnum;
    oneOfType(types: Function[]): IValidateEnum;
    [propName: string]: Function;
}
declare const valdat: Ivaldat;
export { Validate };
export { IValidate };
export { IValidator };
export { valdat as default };
