export const successResponse = (status , message , res ,data)=>{
    return res.status(status).json({message , data});
}