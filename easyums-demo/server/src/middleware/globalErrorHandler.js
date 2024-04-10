async function globalErrorHandler(ctx, next) {
    try {
        await next();
    } catch (error) {
        console.error("[globalErrorHandler]");
        console.error(error);
        ctx.body  = { error: error.code || "INTERNAL_SERVER_ERROR", message: error.message || "" };
        ctx.status = error.statusCode || 500;
    }
}

module.exports = globalErrorHandler;