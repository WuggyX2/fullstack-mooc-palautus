const idValidation = (request, response, next) => {
    const id = request.params.id;

    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        const errorBody = {
            error: "id is not in the correct format"
        };
        response.status(400).json(errorBody);
    } else {
        next();
    }
};

const errorHandler = (error, request, response, next) => {
    if (error.name === "ValidationError") {
        if (error.errors.username.kind === "unique") {
            return response.status(400).send({
                error: `A user with the username ${error.errors.username.value} already exists`
            });
        }
        return response.status(400).send({ error: error.message });
    }

    next(error);
};

module.exports = { idValidation, errorHandler };
