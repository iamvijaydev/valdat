export interface IData {
    [propName: string]: any
}

export default class Validate {
    required: Boolean;
    stack: Function[];

    constructor() {
        this.required = false;
        this.stack = [];
    }

    isRequired(): Validate {
        this.required = true;
        return this;
    }
}