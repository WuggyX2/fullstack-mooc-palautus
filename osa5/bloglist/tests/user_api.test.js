const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const User = require("../models/user");
const api = supertest(app);

const initialUsers = [
    {
        username: "Matti testaa 1",
        password: "testi henkilo 1",
        name: "Matti 1"
    },
    {
        username: "Matti testaa 2",
        password: "testi henkilo 2",
        name: "Matti 2"
    }
];

beforeEach(async () => {
    await User.deleteMany({});
    await User.insertMany(initialUsers);
});

describe("test get users api", () => {
    test("users are succesfully returned from the database", async () => {
        const response = await api.get("/api/users");

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveLength(initialUsers.length);
    });
});

describe("test post users api", () => {
    test("create users success", async () => {
        const newUser = {
            username: "testi 3",
            password: "testi 3",
            name: "testi 3"
        };

        const response = await api.post("/api/users").send(newUser);

        expect(response.statusCode).toBe(200);
    });

    test("unique username error", async () => {
        const newUser = {
            username: "Matti testaa 1",
            password: "testi 3",
            name: "testi 3"
        };

        const response = await api.post("/api/users").send(newUser);
        expect(response.statusCode).toBe(400);
        expect(response.body.error).toBe(
            "A user with the username Matti testaa 1 already exists"
        );
    });

    test("short password error", async () => {
        const newUser = {
            username: "testi 3",
            password: "te",
            name: "testi 3"
        };

        const response = await api.post("/api/users").send(newUser);
        expect(response.statusCode).toBe(400);
        expect(response.body.error).toBe(
            "Password needs to be longer than 3 characters"
        );
    });
});

afterAll(() => {
    mongoose.connection.close();
});
