import Validate, { IData } from './Validate';
export default class ValidateEnum extends Validate {
    constructor();
    oneOfFactory(types: any[]): (data: IData, key: string) => {
        error: boolean;
        message: string;
    };
    oneOfTypeFactory(types: Function[]): (data: IData, key: string) => {
        error: boolean;
        message: string;
    };
    oneOf(types: any[]): this;
    oneOfType(types: Function[]): this;
}
