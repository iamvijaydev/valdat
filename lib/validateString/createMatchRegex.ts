import isString from 'lodash/isString';
import isRegExp from 'lodash/isRegExp';

import {
    IState,
    IData,
    IValidator
} from '../baseValidate';
import { getErrorCodes } from '../errorCodes';

const {
    "STRING/MATCH_REGEX/INCORRECT_ARG": incorrectArgMsg,
    "STRING/MATCH_REGEX/INCORRECT_TYPE": incorrectTypeMsg,
    "STRING/MATCH_REGEX/MISMATCH": mismatchMsg,
} = getErrorCodes();

export default (state: IState) => ({
    matchRegex: (regex: RegExp) => {
        const validator = (data: IData, key: string) => {
            if (!isRegExp(regex)) {
                throw new Error(incorrectArgMsg);
            }

            const value = data[key];
            let error = false;
            let message = '';

            if (!isString(value)) {
                error = true;
                message = incorrectTypeMsg(key);
            } else if (!regex.test(value)) {
                error = true;
                message = mismatchMsg(key, regex);
            }

            return {
                error,
                message,
            };
        };

        state.stack.push(validator);

        return state;
    }
});