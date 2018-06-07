import { IValidate } from './interface/IValidate';

export interface IData {
    [propName: string]: any
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