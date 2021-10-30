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

afterAll(() => {
    mongoose.connection.close();
});
