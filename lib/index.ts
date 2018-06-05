import Valdat from './valdat/Valdat';
import ValidateString from './valdat/ValidateString';
import ValidateNumber from './valdat/ValidateNumber';
import ValidateObject from './valdat/ValidateObject';
import ValidateArray from './valdat/ValidateArray';
import ValidateEnum from './valdat/ValidateEnum';

Valdat.register('string', () => new ValidateString().string);
Valdat.register('number', () => new ValidateNumber().number);
Valdat.register('object', () => new ValidateObject().object);
Valdat.register('array', () => new ValidateArray().array);
Valdat.register('oneOf', () => new ValidateEnum().oneOf);
Valdat.register('oneOfType', () => new ValidateEnum().oneOfType);

export { Valdat as default };