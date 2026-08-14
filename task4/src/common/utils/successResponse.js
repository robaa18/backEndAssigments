export const successResponse = ({res, message = 'success', data, status}={}) => {
    return res.status(status).json({ message, data });
}
