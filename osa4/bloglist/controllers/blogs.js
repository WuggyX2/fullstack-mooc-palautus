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
    const user = await User.findById(request.user);

    const newBlogData = {
        ...request.body,
        user: user._id
    };

    const blog = new Blog(newBlogData);

    if (!blog.url || !blog.title) {
        return response.status(400).send();
    }

    if (!blog.likes) {
        blog.likes = 0;
    }

    const savedBlog = await blog.save();

    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    response.status(201).json(savedBlog);
});

blogRouter.delete("/:id", idValidation, async (request, response) => {
    const blogToDelete = await Blog.findById(request.params.id);

    if (blogToDelete) {
        if (blogToDelete.user.toString() === request.user) {
            await Blog.deleteOne(blogToDelete);
            response.status(204).end();
        } else {
            response.status(401).end();
        }
    } else {
        response.status(400).json({ error: "Blog does not exist" });
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
