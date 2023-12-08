import IErrorObject from "../../useCases/interfaces/IErrorObject";
import ICustomError from "../../useCases/interfaces/IcustomError";

class CustomError implements ICustomError{
    createError(status: number, message: string): IErrorObject {
        const error: Error = new Error();
        const statusCode = status || 500;
        const obj = {
            error, statusCode
        }
        return obj;
    }
}