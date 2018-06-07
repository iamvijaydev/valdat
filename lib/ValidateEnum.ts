import Validate, { IData } from './Validate';

export default class ValidateEnum extends Validate {
    constructor() {
        super();
    }

    private oneOfFactory(types: any[]) {
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

    private oneOfTypeFactory(types: Function[]) {
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

    enum() {
        return this;
    }

    oneOf(types: any[]) {
        this.stack.push(this.oneOfFactory(types));
        return this;
    }

    oneOfType(types: Function[]) {
        this.stack.push(this.oneOfTypeFactory(types));
        return this;
    }
}