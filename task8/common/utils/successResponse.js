export const successResponse = (status , message , res)=>{
    return res.status(status).json({message});
}