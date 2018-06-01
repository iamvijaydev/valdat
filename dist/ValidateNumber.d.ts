import Validate, { IData } from './Validate';
export default class ValidateNumber extends Validate {
    constructor();
    numberFatory(): (data: IData, key: string) => {
        error: boolean;
        message: string;
    };
    minFatory(min: number): (data: IData, key: string) => {
        error: boolean;
        message: string;
    };
    maxFatory(max: number): (data: IData, key: string) => {
        error: boolean;
        message: string;
    };
    number(): ValidateNumber;
    min(min: number): ValidateNumber;
    max(max: number): ValidateNumber;
}
