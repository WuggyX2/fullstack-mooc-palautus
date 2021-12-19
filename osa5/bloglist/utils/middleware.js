const jwt = require("jsonwebtoken");
const User = require("../models/user");

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
    } else if (error.name === "JsonWebTokenError") {
        return response.status(401).json({
            error: "invalid token"
        });
    } else if (error.name === "TokenExpiredError") {
        return response.status(401).json({
            error: "token expired"
        });
    }

    next(error);
};

const tokenExtractor = (request, response, next) => {
    const authorization = request.get("authorization");

    if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
        request.token = authorization.substring(7);
    }
    next();
};

const userExtractor = (request, response, next) => {
    const decodedToken = jwt.verify(request.token, process.env.SECRET);

    if (!request.token || !decodedToken.id) {
        return response.status(401).json({ error: "token missing or invalid" });
    }

    request.user = decodedToken.id;

    next();
};

module.exports = { idValidation, errorHandler, tokenExtractor, userExtractor };
