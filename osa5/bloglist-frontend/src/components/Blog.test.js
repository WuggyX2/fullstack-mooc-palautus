import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent, screen } from "@testing-library/react";
import Blog from "./Blog";

let component;
let mockHandler = jest.fn();
let mockRemove = jest.fn();

const blog = {
    title: "Testing with testing library",
    author: "Test Library",
    url: "testinglibrarby.com",
    likes: 0,
    user: null,
};

beforeEach(() => {
    component = render(
        <Blog blog={blog} blogLike={mockHandler} blogRemove={mockRemove} />
    );
});

test("Renders title and author only as default", () => {
    expect(component.container).toHaveTextContent(
        "Testing with testing library"
    );

    expect(component.container).toHaveTextContent("Test Library");

    const emailBlock = screen.queryByText("testinglibrarby.com");
    expect(emailBlock).not.toBeVisible();
});

test("Clicking the button also shows rest of the info", () => {
    const urlBeforeClick = screen.queryByText("testinglibrarby.com");
    expect(urlBeforeClick).not.toBeVisible();

    const button = component.getByText("view");
    fireEvent.click(button);
    const url = screen.queryByText("testinglibrarby.com");
    expect(url).toBeVisible();
});

test("Clicking the like button twice works", async () => {
    const button = component.getByText("view");
    fireEvent.click(button);
    const button2 = component.getByText("like");
    fireEvent.click(button2);
    fireEvent.click(button2);

    expect(mockHandler.mock.calls).toHaveLength(2);
});
