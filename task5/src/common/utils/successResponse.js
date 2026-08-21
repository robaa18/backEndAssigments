export const successResponse=({res,data, message="success",status}={})=>{
    return res.status(status).json({message,data});
}