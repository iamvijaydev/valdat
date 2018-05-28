import { IData } from './Validate';
import ValidateString from './ValidateString';
import ValidateEnum from './ValidateEnum';

const Valdat: IData = {};

Valdat.check = (schema: IData, data: IData) => {
    let isValid = true;
    let errors: IData = {};

    Object.keys(schema)
        .forEach((key) => {
            const stack = schema[key].stack;
            for (let i = 0, j = stack.length; i < j; i++) {
                const test = stack[i];
                const {
                    error,
                    message
                } = test(data, key);

                if (error) {
                    isValid = false;
                    errors[key] = message
                    break;
                }
            }
        })

    return {
        isValid,
        errors
    }
}

Valdat.register = (name: string, method: Function) => {
    Valdat[name] = method;
}

Valdat.register('string', () => new ValidateString().string);
Valdat.register('oneOf', () => new ValidateEnum().oneOf);
Valdat.register('oneOfType', () => new ValidateEnum().oneOfType);

export { Valdat as default };