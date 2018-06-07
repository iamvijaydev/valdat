import { IValidateBoolean } from './interface/IValidateBoolean';
import Validate from './Validate';
export default class ValidateBoolean extends Validate implements IValidateBoolean {
    constructor();
    private booleanFatory;
    boolean(): ValidateBoolean;
}
