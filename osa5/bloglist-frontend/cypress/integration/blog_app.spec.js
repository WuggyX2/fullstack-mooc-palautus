/* eslint-disable */
describe("Blog app", function () {
    beforeEach(function () {
        cy.request("POST", "http://localhost:3003/api/testing/reset");
        const user = {
            name: "Test Person",
            username: "TestPerson",
            password: "123",
        };

        cy.request("POST", "http://localhost:3003/api/users/", user);
        cy.visit("http://localhost:3000");
    });

    it("Front page can be opened", function () {
        cy.contains("Blogs");
    });

    it("Login form can be opened", function () {
        cy.contains("login").click();
    });

    describe("Login", function () {
        it("succeeds with correct credentials", function () {
            cy.contains("login").click();
            cy.get("#username").type("TestPerson");
            cy.get("#password").type("123");
            cy.get("#login-button").click();

            cy.contains("Test Person logged in");
        });

        it("fails with wrong credentials", function () {
            cy.contains("login").click();
            cy.get("#username").type("wrong");
            cy.get("#password").type("credentials");
            cy.get("#login-button").click();

            cy.get(".errorMessage").contains("invalid username or password");
        });
    });

    describe("When logged in", function () {
        beforeEach(function () {
            cy.login({ username: "TestPerson", password: "123" });
        });

        it("A new blog can be added", function () {
            cy.contains("Create New Blog").click();
            cy.get("#title").type("Cypress test blog");
            cy.get("#author").type("Cypress");
            cy.get("#url").type("www.google.fi");
            cy.get("#create-blog").click();
            cy.contains("Cypress test blog");
        });

        describe("And a blog exists", function () {
            beforeEach(function () {
                cy.createBlog({
                    title: "Created with command",
                    author: "Cypress Automated",
                    url: "www.google.fi",
                });
            });

            it("Blog can be liked", function () {
                cy.get(".blogBlock")
                    .contains("Created with command Cypress Automated")
                    .contains("view")
                    .click();
                cy.contains("likes 0").contains("Like").click();

                cy.contains("1");
            });

            it("Blog can be removed", function () {
                cy.get(".blogBlock")
                    .contains("Created with")
                    .contains("view")
                    .click();
                cy.contains("remove").click();
                cy.get(".blogBlock")
                    .contains("Created with command Cypress Automated")
                    .should("not.exist");
            });

            it("Blogs are displayed in order of most likes -> least likes", function () {
                //TODO: Get all blogs, compare found list with shown blogs to ensure blogs are in correct order
                cy.createBlog({
                    title: "Created with command 2",
                    author: "Cypress Automated 2",
                    url: "null2",
                });

                cy.get(".blogBlock")
                    .then((blogs) => {
                        return cy.wrap(blogs[0]);
                    })
                    .contains("Created ");

                cy.get(".blogBlock")
                    .contains("Created with command Cypress Automated")
                    .contains("view")
                    .click();
                cy.intercept("/api/blogs/**").as("blogApi");
                cy.contains("likes 0").contains("Like").click();
                cy.wait("@blogApi");

                cy.get(".blogBlock")
                    .then((blogs) => {
                        return cy.wrap(blogs[0]);
                    })
                    .contains("Created with command Cypress Automated");
            });
        });
    });
});
