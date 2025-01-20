class ApiError extends Error{
    constructor(
        statusCode,
        message =" somthing went wrong ",
        errors = [],
        stack=""
    ){
        super(message)
        this.statusCode = statusCode;
        this.data = null;
        this.message = message;
        this.success = false;
        this.errors = errors; 
      //  console.log("11111111111111111111111111111111111111111");
        if(stack){
            this.stack = stack;
        }else{
            this.error.captureStackTrace(this, this.constructor);
            console.log("------------------------");
        }

    }
} 
export { ApiError }