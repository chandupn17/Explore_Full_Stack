class ApiError extends Error{
    constructor(
        statusCode,
        message =" somthing went wrong ",
        errors = [],
        statck=""
    ){
        super(message)
        this.statusCode = statusCode;
        this.data =data;
        this.message = message;
        this.success = success;
        this.error = error; 
        if(statck){
            this.statck = statck;
        }else{
            this.error.captureStackTrace(this, this.constructor);
        }

    }
} 