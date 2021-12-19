const bcrypt = require("bcrypt");
const userRouter = require("express").Router();
const User = require("../models/user");

userRouter.post("/", async (request, response, next) => {
    try {
        const body = request.body;

        if (body.password.length < 3) {
            const errorBody = {
                error: "Password needs to be longer than 3 characters"
            };
            response.status(400).json(errorBody);
        }

        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(body.password, saltRounds);

        const user = new User({
            username: body.username,
            name: body.name,
            passwordHash
        });

        const savedUser = await user.save();
        response.json(savedUser);
    } catch (error) {
        next(error);
    }
});

userRouter.get("/", async (request, response) => {
    const users = await User.find({}).populate("blogs", {
        url: 1,
        author: 1,
        title: 1
    });
    response.json(users);
});

module.exports = userRouter;
