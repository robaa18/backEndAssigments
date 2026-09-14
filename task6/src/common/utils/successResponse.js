export const successResponse = ({ res, message = "success", status, data }) => {
  return res.status(status).json({ message, data });
};
