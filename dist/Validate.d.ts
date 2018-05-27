export interface IData {
    [propName: string]: any;
}
export default class Validate {
    required: Boolean;
    stack: Function[];
    constructor();
    isRequired(): Validate;
    enumFactory(items: any[]): (data: IData, key: string) => {
        error: boolean;
        message: string;
    };
    enum(items: String[]): Validate;
}
