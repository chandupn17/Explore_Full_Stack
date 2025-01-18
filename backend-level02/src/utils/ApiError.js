class ApiError extends Error{
    constructor(
        statusCode,
        message =" somthing went wrong ",
        errors = [],
        stack=""
    ){
        super(message)
        this.statusCode = statusCode;
        this.data =data;
        this.message = message;
        this.success = success;
        this.error = error; 
        if(stack){
            this.stack = stack;
        }else{
            this.error.captureStackTrace(this, this.constructor);
            console.log("------------------------");
        }

    }
} 
export { ApiError }