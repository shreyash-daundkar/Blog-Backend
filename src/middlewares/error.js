
const errorMiddleware = (error, req, res, next) => {
    try {
        
        console.log(error.message, error.error);

        if(error?.error?.name === "ZodError") {
            return res.status(400).json({
                message: error.error.issues[0].message,
                error: error.error.issues,
                success: false,
            });
        }

        res.status(error.statusCode).json({
            message: error.message,
            error: error.error,
            success: false,
        });

    } catch (error) {
        console.log('Error in error middleware', error);

        res.status(500).json({
            message: 'Error in error middleware',
            error: error,
            success: false,
        });
    }
}

module.exports = errorMiddleware;