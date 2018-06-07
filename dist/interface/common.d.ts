export interface IData {
    [propName: string]: any;
}
export interface IValidator {
    (data: IData, key: string): {
        error: boolean;
        message: string;
    };
}
