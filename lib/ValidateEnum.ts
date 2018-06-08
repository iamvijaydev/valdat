import Validate, {
    IValidate,
    IData,
    IValidator
} from './Validate';

export interface IValidateEnum extends IValidate {
    oneOf(types: any[]): IValidateEnum;
    oneOfType(types: Function[]): IValidateEnum;
}

export default class ValidateEnum extends Validate implements IValidateEnum {
    constructor() {
        super();
    }

    private oneOfFactory(types: any[]): IValidator {
        const validator = (data: IData, key: string) => {
            const value = data[key];
            let error = false;
            let message = '';

            if (!types.includes(value)) {
                error = true;
                message = `enum mismatch`;
            }

            return {
                error,
                message,
            };
        };

        return validator;
    }

    private oneOfTypeFactory(types: Function[]): IValidator {
        const validator =  (data: IData, key: string) => {
            const value = data[key];
            const match = types.some((validatorFn) => {
                const { error: err } = validatorFn(data, key);

                return !err;
            })
            const error = !match;
            const message = error ? 'Failed to match' : '';

            return {
                error,
                message,
            };
        };

        return validator;
    }

    oneOf(types: any[]): IValidateEnum {
        this.stack.push(this.oneOfFactory(types));
        return this;
    }

    oneOfType(types: Function[]): IValidateEnum {
        this.stack.push(this.oneOfTypeFactory(types));
        return this;
    }
}