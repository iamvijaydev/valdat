import Validate, { IData } from './Validate';
export default class ValidateArray extends Validate {
    constructor();
    arrayFatory(): (data: IData, key: string) => {
        error: boolean;
        message: string;
    };
    notEmptyFactory(): (data: IData, key: string) => {
        error: boolean;
        message: string;
    };
    ofFactory(type: Function): (data: IData, key: string) => {
        error: any;
        message: string;
    };
    array(): ValidateArray;
    notEmpty(): ValidateArray;
    of(type: Function): ValidateArray;
}
