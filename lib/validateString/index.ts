import isString from 'lodash/isString';
import isUndefined from 'lodash/isUndefined';

import {
    IState,
    IData,
    getInitialState,
    createIsRequired,
    createSameAs
} from '../baseValidate'
import createHasLength from './createHasLength';
import createMatchRegex from './createMatchRegex';
import { getErrorCodes } from '../errorCodes';

const {
    "STRING/REQUIRED": requiredMsg,
    "STRING/MISMATCH": mismatchMsg,
} = getErrorCodes();

export default () => ({
    string: () => {
        const state = getInitialState();
        const validator = (data: IData, key: string) => {
            const value = data[key];
            let error = false;
            let message = '';

            if (isUndefined(value)) {
                if (state.required) {
                    error = true;
                    message = requiredMsg(key);
                }
            } else if (!isString(value)) {
                error = true;
                message = mismatchMsg(key, value);
            }

            return {
                error,
                message,
            };
        };

        state.stack.push(validator);

        Object.assign(state, {
            ...createHasLength(state),
            ...createMatchRegex(state),
            ...createSameAs(state),
            ...createIsRequired(state),
        });

        return state;
    }
});
