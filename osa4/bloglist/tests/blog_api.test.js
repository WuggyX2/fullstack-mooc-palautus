const mongoose = require("mongoose");
const supertest = require("supertest");
const { response } = require("../app");
const app = require("../app");
const Blog = require("../models/blog");
const api = supertest(app);

const initialBlogs = [
    {
        title: "Matti testaa 1",
        author: "testi henkilo 1",
        url: "https://www.google.fi/",
        likes: 1
    },
    {
        title: "Matti testaa 2",
        author: "Testi henkilo 2",
        url: "https://www.google.fi/",
        likes: 2
    }
];

beforeEach(async () => {
    await Blog.deleteMany({});
    let blogObject = new Blog(initialBlogs[0]);
    await blogObject.save();
    blogObject = new Blog(initialBlogs[1]);
    await blogObject.save();
});

describe("test get blogs api", () => {
    test("blogs are returned from database", async () => {
        const response = await api.get("/api/blogs");

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveLength(initialBlogs.length);
    });

    test("blog id field is id not _id object", async () => {
        const response = await api.get("/api/blogs");
        expect(response.body[0].id).toBeDefined();
    });
});

describe("test post blogs api", () => {
    test("blogs are added to the database", async () => {
        const testBlog = {
            title: "testi 123",
            author: "testi testinen",
            url: "https://www.google.fi/",
            likes: 1
        };
        const response = await api.post("/api/blogs").send(testBlog);
        const finalBlogs = await api.get("/api/blogs");

        expect(response.statusCode).toBe(201);
        expect(finalBlogs.body.length).toBe(3);
        expect(response.body.title).toBe("testi 123");
    });

    test("blog likes is set to 0 when not defined", async () => {
        const testBlog = {
            title: "testi 123",
            author: "testi testinen",
            url: "https://www.google.fi/"
        };

        const response = await api.post("/api/blogs").send(testBlog);
        expect(response.statusCode).toBe(201);
        expect(response.body.title).toBe("testi 123");
        expect(response.body.likes).toBe(0);
    });

    test("return 400 bad request when title is not filled", async () => {
        const testBlog = {
            author: "testi testinen",
            url: "https://www.google.fi/"
        };

        const response = await api.post("/api/blogs").send(testBlog);
        expect(response.statusCode).toBe(400);
    });

    test("return 400 bad request when url is not filled", async () => {
        const testBlog = {
            title: "tämä on test",
            author: "testi testinen"
        };

        const response = await api.post("/api/blogs").send(testBlog);
        expect(response.statusCode).toBe(400);
    });
});

describe("test blog delete api", () => {
    test("test delete positive", async () => {
        const testBlogs = await api.get("/api/blogs");

        const deleteResult = await api.delete(
            `/api/blogs/${testBlogs.body[0].id}`
        );

        const remainingBlogs = await api.get("/api/blogs");
        expect(deleteResult.statusCode).toBe(200);
        expect(remainingBlogs.body.length).toBe(1);
    });

    test("test delete person not found", async () => {
        const deleteResult = await api.delete(`/api/blogs/123`);
        expect(deleteResult.statusCode).toBe(400);
    });
});

describe("test blogs api patch", () => {
    test("Update likes success", async () => {
        const testBlogs = await api.get("/api/blogs");

        const updatedBlog = { likes: 3 };
        const updateResult = await api
            .patch(`/api/blogs/${testBlogs.body[0].id}`)
            .send(updatedBlog);

        const result = await api.get("/api/blogs");
        expect(updateResult.statusCode).toBe(200);
        expect(result.body[0].likes).toBe(3);
    });

    test("Invalid id failure", async () => {
        const updatedBlog = { likes: 3 };
        const updateResult = await api
            .patch(`/api/blogs/123`)
            .send(updatedBlog);

        expect(updateResult.statusCode).toBe(400);
    });

    test("Update title success", async () => {
        const testBlogs = await api.get("/api/blogs");

        const updatedBlog = { title: "Päivitys testaus" };
        const updateResult = await api
            .patch(`/api/blogs/${testBlogs.body[0].id}`)
            .send(updatedBlog);

        const result = await api.get("/api/blogs");
        expect(updateResult.statusCode).toBe(200);
        expect(result.body[0].title).toBe("Päivitys testaus");
    });

    test("Update url success", async () => {
        const testBlogs = await api.get("/api/blogs");

        const updatedBlog = { url: "https://salesforce.com" };
        const updateResult = await api
            .patch(`/api/blogs/${testBlogs.body[0].id}`)
            .send(updatedBlog);

        const result = await api.get("/api/blogs");
        expect(updateResult.statusCode).toBe(200);
        expect(result.body[0].url).toBe("https://salesforce.com");
    });
});

afterAll(() => {
    mongoose.connection.close();
});
