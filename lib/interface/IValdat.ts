import { IData } from './IData';

export interface ICheck {
    (schema: IData, data: IData): {
        isValid: boolean;
        errors: IData;
    };
}

export interface IRegister {
    (name: string, method: Function): Function;
}

export interface ICustom {
    (validator: Function): {
        stack: Function[];
    };
}

export interface IValdat {
    check: ICheck;
    register: IRegister;
    custom: ICustom;
    [propName: string]: Function;
}