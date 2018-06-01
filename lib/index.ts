import Valdat from './Valdat';
import ValidateString from './ValidateString';
import ValidateNumber from './ValidateNumber';
import ValidateEnum from './ValidateEnum';

Valdat.register('string', () => new ValidateString().string);
Valdat.register('number', () => new ValidateNumber().number);
Valdat.register('oneOf', () => new ValidateEnum().oneOf);
Valdat.register('oneOfType', () => new ValidateEnum().oneOfType);

export { Valdat as default };