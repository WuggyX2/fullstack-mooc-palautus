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

module.exports = { idValidation };
