import { IValidateArray } from './interface/IValidateArray';
import Validate from './Validate';
export default class ValidateArray extends Validate implements IValidateArray {
    constructor();
    private arrayFactory;
    private notEmptyFactory;
    private ofFactory;
    array(): ValidateArray;
    notEmpty(): ValidateArray;
    ofType(type: Function): ValidateArray;
}
