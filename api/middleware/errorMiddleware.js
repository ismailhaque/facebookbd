export const errorMiddleware = (error, req, res, next) => {
    const errorMessage = error.message || "Unknow error"
    const errorStatus = error.status || 500

    res.status(errorStatus).json({
        message : errorMessage
    })
}