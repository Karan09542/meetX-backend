export class AppError extends Error {
    public statusCode:number;
    public status :string;
    constructor(message:string, statusCode:number){
        super(message);
        this.statusCode = statusCode;
        this.status = this.statusCode === 500 ? 'error' : 'fail';
        Error.captureStackTrace(this, this.constructor);
    }
}