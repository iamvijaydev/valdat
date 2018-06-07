import { IValidateEnum } from './interface/IValidateEnum';
import Validate from './Validate';
export default class ValidateEnum extends Validate implements IValidateEnum {
    constructor();
    private oneOfFactory;
    private oneOfTypeFactory;
    oneOf(types: any[]): IValidateEnum;
    oneOfType(types: Function[]): IValidateEnum;
}
