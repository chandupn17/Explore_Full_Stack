const asyncHandler = (requestHandler)=>{
return (req, res, next)=>{
        Promise.resolve(requestHandler(req, res, next)).catch((err) =>next(err));
        
    }
};
export {asyncHandler};

//const asyncHandler = ()=>{};
//const asyncHandler = (func) =>{() =>{ }} || const asyncHandler = (func) =>() =>{ }
//const asyncHandler = (func) =>() =>{ }

    /*

    const async = (fn) => async (req, res, next)=>{
        try{
        await fn(req, res, next)
        }
        catck(error){
        res.ststus(error.code || 500).json({
        success : false,
        message: error.message
        })
        }
}
    */


