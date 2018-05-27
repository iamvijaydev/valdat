import Validate, { IData } from './Validate';

export default class ValidateString extends Validate {
    constructor() {
        super();
    }

    stringFatory() {
        return (data: IData, key: string) => {
            const value = data[key];
            let error = false;
            let message = '';

            if (value === null) {
                if (this.required) {
                    error = true;
                    message = `${key} is required, but its value is undefined.`;
                }
            } else if (typeof value !== typeof '') {
                error = true;
                message = `${key} should be string, recieved ${typeof value}.`;
            }

            return {
                error,
                message,
            }
        }
    }

    hasLenFatory(length: number) {
        return (data: IData, key: string) => {
            const value = data[key];
            let error = false;
            let message = '';

            if (value.length !== length) {
                error = true;
                message = `${key} should be of length ${length}.`;
            }

            return {
                error,
                message,
            }
        }
    }

    regexFactory(regex: RegExp) {
        return (data: IData, key: string) => {
            const value = data[key];
            let error = false;
            let message = '';

            if (!regex.test(value)) {
                error = true;
                message = `${key} does not match the regex ${regex}.`;
            }

            return {
                error,
                message,
            }
        }
    }

    string(): ValidateString{
        this.stack.push(this.stringFatory());
        return this;
    }

    hasLen(length: number): ValidateString{
        this.stack.push(this.hasLenFatory(length));
        return this;
    }

    matchRegex(regex: RegExp): ValidateString{
        this.stack.push(this.regexFactory(regex));
        return this;
    }
}