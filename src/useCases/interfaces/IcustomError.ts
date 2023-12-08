import IErrorObject from "./IErrorObject";

export default interface ICustomError{
    createError(status: number, message: string): IErrorObject;
}