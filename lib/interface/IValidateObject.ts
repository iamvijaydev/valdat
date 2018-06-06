import { IData } from './common';
import { IValidate } from './IValidate';

export interface IValidateObject extends IValidate {
    object(): IValidateObject;
    shape(shape: IData): IValidateObject;
}