export interface IData {
    [propName: string]: any;
}
export default class Validate {
    required: Boolean;
    stack: Function[];
    constructor();
    isRequired(): Validate;
}
