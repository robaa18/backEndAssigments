export const errorResponse = (error, req, res, next) => {
  return res.status(error.cause?.status ?? 500).json({message:error.message , stack:error.stack , error});
};
