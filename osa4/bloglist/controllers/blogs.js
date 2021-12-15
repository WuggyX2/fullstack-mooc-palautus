const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const { idValidation } = require("../utils/middleware");

blogRouter.get("/", async (request, response) => {
    const blogs = await Blog.find({}).populate("user", {
        username: 1,
        name: 1
    });
    response.json(blogs);
});

blogRouter.post("/", async (request, response) => {
    const foundUser = await User.findById(request.body.userId);
    const newBlogData = {
        ...request.body,
        user: foundUser._id
    };

    const blog = new Blog(newBlogData);

    if (!blog.url || !blog.title) {
        return response.status(400).send();
    }

    if (!blog.likes) {
        blog.likes = 0;
    }

    const savedBlog = await blog.save();
    console.log("Tallennettiin blogi");

    foundUser.blogs = foundUser.blogs.concat(savedBlog._id);
    await foundUser.save();

    response.status(201).json(savedBlog);
});

blogRouter.delete("/:id", idValidation, async (request, response) => {
    const result = await Blog.findByIdAndRemove(request.params.id);
    if (result) {
        response.status(200).end();
    } else {
        const errorBody = {
            error: "Blog does not exist"
        };
        response.status(400).json(errorBody);
    }
});

blogRouter.patch("/:id", idValidation, async (request, response) => {
    const newData = {
        likes: request.body.likes,
        title: request.body.title,
        url: request.body.url,
        author: request.body.author
    };

    const result = await Blog.findByIdAndUpdate(request.params.id, newData, {
        new: true
    });

    if (result) {
        response.status(200).json(result);
    } else {
        const errorBody = {
            error: "Error occured when updating"
        };
        response.status(400).json(errorBody);
    }
});

module.exports = blogRouter;
