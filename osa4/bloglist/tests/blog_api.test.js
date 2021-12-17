const mongoose = require("mongoose");
const supertest = require("supertest");
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

const testUser = {
    username: "Test User",
    password: process.env.TestUserPW
};

beforeEach(async () => {
    await Blog.deleteMany({});
    await Blog.insertMany(initialBlogs);

    //insert test user to the test database
    await api.post("/api/users").send({ ...testUser, name: "Test User" });
});

describe("test get blogs api", () => {
    test("blogs are returned from database", async () => {
        const getTestUserToken = await api.post("/api/login").send(testUser);

        const response = await api
            .get("/api/blogs")
            .set({ Authorization: "Bearer " + getTestUserToken.body.token });

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveLength(initialBlogs.length);
    });

    test("blog id field is id not _id object", async () => {
        const getTestUserToken = await api.post("/api/login").send(testUser);

        const response = await api
            .get("/api/blogs")
            .set({ Authorization: "Bearer " + getTestUserToken.body.token });

        expect(response.body[0].id).toBeDefined();
    });

    test("get blogs unathorized", async () => {
        const response = await api
            .get("/api/blogs")
            .set({ Authorization: "Bearer  12345" })
            .expect(401);
    });
});

describe("test post blogs api", () => {
    test("blogs are added to the database", async () => {
        const getTestUserToken = await api.post("/api/login").send(testUser);

        const testBlog = {
            title: "testi 123",
            author: "testi testinen",
            url: "https://www.google.fi/",
            likes: 1
        };
        const response = await api
            .post("/api/blogs")
            .send(testBlog)
            .set({ Authorization: "Bearer " + getTestUserToken.body.token });

        const finalBlogs = await api
            .get("/api/blogs")
            .set({ Authorization: "Bearer " + getTestUserToken.body.token });

        expect(response.statusCode).toBe(201);
        expect(finalBlogs.body.length).toBe(3);
        expect(response.body.title).toBe("testi 123");
    });

    test("blog likes is set to 0 when not defined", async () => {
        const getTestUserToken = await api.post("/api/login").send(testUser);

        const testBlog = {
            title: "testi 123",
            author: "testi testinen",
            url: "https://www.google.fi/"
        };

        const response = await api
            .post("/api/blogs")
            .send(testBlog)
            .set({ Authorization: "Bearer " + getTestUserToken.body.token });

        expect(response.statusCode).toBe(201);
        expect(response.body.title).toBe("testi 123");
        expect(response.body.likes).toBe(0);
    });

    test("return 400 bad request when title is not filled", async () => {
        const getTestUserToken = await api.post("/api/login").send(testUser);

        const testBlog = {
            author: "testi testinen",
            url: "https://www.google.fi/"
        };

        const response = await api
            .post("/api/blogs")
            .send(testBlog)
            .set({ Authorization: "Bearer " + getTestUserToken.body.token });
        expect(response.statusCode).toBe(400);
    });

    test("return 400 bad request when url is not filled", async () => {
        const getTestUserToken = await api.post("/api/login").send(testUser);

        const testBlog = {
            title: "tämä on test",
            author: "testi testinen"
        };

        const response = await api
            .post("/api/blogs")
            .send(testBlog)
            .set({ Authorization: "Bearer " + getTestUserToken.body.token });
        expect(response.statusCode).toBe(400);
    });

    test("blog post unauthorized", async () => {
        const testBlog = {
            title: "tämä on test",
            author: "testi testinen"
        };

        const response = await api
            .post("/api/blogs")
            .send(testBlog)
            .set({ Authorization: "Bearer 1234" })
            .expect(401);
    });
});

describe("test blog delete api", () => {
    test("test delete positive", async () => {
        const getTestUserToken = await api.post("/api/login").send(testUser);
        const blogToDelete = await api
            .post("/api/blogs")
            .send({
                author: "deletetest",
                title: "Testing delete",
                url: "test.fi"
            })
            .set({ Authorization: "Bearer " + getTestUserToken.body.token });

        const testBlogs = await api
            .get("/api/blogs")
            .set({ Authorization: "Bearer " + getTestUserToken.body.token });

        await api
            .delete(`/api/blogs/${blogToDelete.body.id}`)
            .set({ Authorization: "Bearer " + getTestUserToken.body.token })
            .expect(204);

        const deleteResult = await api
            .get("/api/blogs")
            .set({ Authorization: "Bearer " + getTestUserToken.body.token });

        expect(deleteResult.statusCode).toBe(200);
        expect(testBlogs.body.length - deleteResult.body.length).toBe(1);
    });

    test("test delete blog not found", async () => {
        const getTestUserToken = await api.post("/api/login").send(testUser);

        const deleteResult = await api
            .delete(`/api/blogs/123`)
            .set({ Authorization: "Bearer " + getTestUserToken.body.token });
        expect(deleteResult.statusCode).toBe(400);
    });

    test("test delete blog unautorized", async () => {
        const getTestUserToken = await api.post("/api/login").send(testUser);
        const blogToDelete = await api
            .post("/api/blogs")
            .send({
                author: "deletetest",
                title: "Testing delete",
                url: "test.fi"
            })
            .set({ Authorization: "Bearer " + getTestUserToken.body.token });

        await api
            .delete(`/api/blogs/${blogToDelete.body.id}`)
            .set({ Authorization: "Bearer 123" })
            .expect(401);
    });
});

describe("test blogs api patch", () => {
    test("Update likes success", async () => {
        const getTestUserToken = await api.post("/api/login").send(testUser);
        const testBlogs = await api
            .get("/api/blogs")
            .set({ Authorization: "Bearer " + getTestUserToken.body.token });

        const updatedBlog = { likes: 3 };
        const updateResult = await api
            .patch(`/api/blogs/${testBlogs.body[0].id}`)
            .send(updatedBlog)
            .set({ Authorization: "Bearer " + getTestUserToken.body.token });

        const result = await api
            .get("/api/blogs")
            .set({ Authorization: "Bearer " + getTestUserToken.body.token });
        expect(updateResult.statusCode).toBe(200);
        expect(result.body[0].likes).toBe(3);
    });

    test("Invalid id failure", async () => {
        const getTestUserToken = await api.post("/api/login").send(testUser);

        const updatedBlog = { likes: 3 };
        const updateResult = await api
            .patch(`/api/blogs/123`)
            .send(updatedBlog)
            .set({ Authorization: "Bearer " + getTestUserToken.body.token });

        expect(updateResult.statusCode).toBe(400);
    });

    test("Update title success", async () => {
        const getTestUserToken = await api.post("/api/login").send(testUser);
        const testBlogs = await api
            .get("/api/blogs")
            .set({ Authorization: "Bearer " + getTestUserToken.body.token });

        const updatedBlog = { title: "Päivitys testaus" };
        const updateResult = await api
            .patch(`/api/blogs/${testBlogs.body[0].id}`)
            .send(updatedBlog)
            .set({ Authorization: "Bearer " + getTestUserToken.body.token });

        const result = await api
            .get("/api/blogs")
            .set({ Authorization: "Bearer " + getTestUserToken.body.token });

        expect(updateResult.statusCode).toBe(200);
        expect(result.body[0].title).toBe("Päivitys testaus");
    });

    test("Update url success", async () => {
        const getTestUserToken = await api.post("/api/login").send(testUser);
        const testBlogs = await api
            .get("/api/blogs")
            .set({ Authorization: "Bearer " + getTestUserToken.body.token });

        const updatedBlog = { url: "https://salesforce.com" };
        const updateResult = await api
            .patch(`/api/blogs/${testBlogs.body[0].id}`)
            .send(updatedBlog)
            .set({ Authorization: "Bearer " + getTestUserToken.body.token });

        const result = await api
            .get("/api/blogs")
            .set({ Authorization: "Bearer " + getTestUserToken.body.token });
        expect(updateResult.statusCode).toBe(200);
        expect(result.body[0].url).toBe("https://salesforce.com");
    });
});

afterAll(() => {
    mongoose.connection.close();
});
