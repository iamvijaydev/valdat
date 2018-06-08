export interface IData {
    [propName: string]: any
}

export interface IError {
    error: boolean;
    message: string;
}

export interface IValidator {
    (data: IData, key: string): IError;
}

export interface IValidate {
    isRequired(): void;
}

export default class Validate implements IValidate {
    protected required: boolean;
    protected stack: Function[];

    constructor() {
        this.required = false;
        this.stack = [];
    }

    isRequired(): void {
        this.required = true;
    }
}