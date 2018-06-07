import { IValidateNumber } from './interface/IValidateNumber';
import Validate from './Validate';
export default class ValidateNumber extends Validate implements IValidateNumber {
    constructor();
    private numberFatory;
    private minFatory;
    private maxFatory;
    number(): ValidateNumber;
    min(min: number): ValidateNumber;
    max(max: number): ValidateNumber;
}
