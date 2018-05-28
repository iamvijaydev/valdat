import Validate, { IData } from './Validate';

export default class ValidateEnum extends Validate {
    constructor() {
        super();
    }

    oneOfFactory(types: any[]) {
        return (data: IData, key: string) => {
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
            }
        }
    }

    oneOfTypeFactory(types: Function[]) {
        return (data: IData, key: string) => {
            const value = data[key];
            const match = types.some((item) => {
                const { error: err } = item(data, key);

                return !err;
            })
            const error = !match;
            const message = error ? 'Failed to match' : '';

            return {
                error,
                message,
            }
        }
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