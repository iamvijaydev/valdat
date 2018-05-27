export interface IData {
    [propName: string]: any
}

export default class Validate {
    required: Boolean;
    stack: Function[];

    constructor() {
        this.required = false;
        this.stack = [];
    }

    isRequired(): Validate {
        this.required = true;
        return this;
    }

    enumFactory(items: any[]) {
        return (data: IData, key: string) => {
            const value = data[key];
            let error = false;
            let message = '';

            if (!items.includes(value)) {
                error = true;
                message = `enum mismatch`;
            }

            return {
                error,
                message,
            }
        }
    }

    enum(items: String[]): Validate {
        if (!Array.isArray(items)) {
            throw new Error('enum items should be an array')
        }
        if (!items.length) {
            throw new Error('enum items should be provided.');
        }

        this.stack.push(this.enumFactory(items));
        return this;
    }
}