import isBoolean from 'lodash/isBoolean';
import isUndefined from 'lodash/isUndefined';

import {
    IState,
    IData,
    getInitialState,
    createIsRequired,
    createSameAs
} from '../baseValidate'
import { getErrorCodes } from '../errorCodes';

const {
    "BOOLEAN/REQUIRED": requiredMsg,
    "BOOLEAN/MISMATCH": mismatchMsg,
} = getErrorCodes();

export default () => ({
    boolean: () => {
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
            } else if (!isBoolean(value)) {
                error = true;
                message = mismatchMsg(key, value);
            }

            return {
                error,
                message,
            };
        };

        state.stack.push(validator);

        return Object.assign(
            state,
            createSameAs(state),
            createIsRequired(state)
        );
    }
});
