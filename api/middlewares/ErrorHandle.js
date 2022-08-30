const ErrorHandle = (error,req,res,next) => {
    console.log(error);
    res.status(400).json({message:error._message,error:error.errors})
}

export default ErrorHandle; 