import {
    argErrorCodes,
    defaultErrorCodes
} from './codes';

let customErrorCodes = {};

export const setCustomErrorMsgs = (custom: object = {}) => {
    Object.keys(custom)
        .forEach((key: string) => {
            if (defaultErrorCodes.hasOwnProperty(key)) {
                customErrorCodes[key] = custom[key];
            }
        });
};

export const getErrorCodes = () => ({
    ...argErrorCodes,
    ...defaultErrorCodes,
    ...customErrorCodes
});