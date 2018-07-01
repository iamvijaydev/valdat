import isString from 'lodash/isString';
import isNumber from 'lodash/isNumber';

import {
    IState,
    IData,
    IValidator
} from '../baseValidate';
import { getErrorCodes } from '../errorCodes';

const {
    "STRING/HAS_LENGTH/INCORRECT_ARG": incorrectArgMsg,
    "STRING/HAS_LENGTH/INCORRECT_TYPE": incorrectTypeMsg,
    "STRING/HAS_LENGTH/MISMATCH": mismatchMsg,
} = getErrorCodes();

export default (state: IState) => ({
    length: (length: number) => {
        const validator: IValidator = (data: IData, key: string) => {
            if (!isNumber(length)) {
                throw new Error(incorrectArgMsg);
            }

            const value = data[key];
            let error = false;
            let message = '';

            if (!isString(value)) {
                error = true;
                message = incorrectTypeMsg(key);
            } else if (value.length !== length) {
                error = true;
                message = mismatchMsg(key, length);
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