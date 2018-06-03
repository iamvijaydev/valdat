import Valdat from './Valdat';
import ValidateString from './ValidateString';
import ValidateNumber from './ValidateNumber';
import ValidateObject from './ValidateObject';
import ValidateArray from './ValidateArray';
import ValidateEnum from './ValidateEnum';

Valdat.register('string', () => new ValidateString().string);
Valdat.register('number', () => new ValidateNumber().number);
Valdat.register('object', () => new ValidateObject().object);
Valdat.register('array', () => new ValidateArray().array);
Valdat.register('oneOf', () => new ValidateEnum().oneOf);
Valdat.register('oneOfType', () => new ValidateEnum().oneOfType);

export { Valdat as default };