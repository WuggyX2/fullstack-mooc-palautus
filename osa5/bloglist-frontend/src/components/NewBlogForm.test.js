import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import NewBlogForm from "./NewBlogForm";

const addBlog = jest.fn();
let component;

beforeEach(() => {
    component = render(<NewBlogForm createBlog={addBlog} />);
});

test("<BlogForm /> updates parent state and calls onSubmit", () => {
    const input = component.container.querySelector("input");
    const form = component.container.querySelector("form");

    fireEvent.change(input, {
        target: { value: "testing of forms could be easier" },
    });
    fireEvent.submit(form);

    expect(addBlog.mock.calls).toHaveLength(1);
    expect(addBlog.mock.calls[0][0].title).toBe(
        "testing of forms could be easier"
    );
});

test("<BlogForm /> calls function OnSubmit with correct parameters", () => {
    const inputTitle = component.container.querySelector("#title");
    const inputAuthor = component.container.querySelector("#author");
    const inputUrl = component.container.querySelector("#url");
    const form = component.container.querySelector("form");

    fireEvent.change(inputTitle, {
        target: { value: "Testing of forms could be easier" },
    });
    fireEvent.change(inputAuthor, {
        target: { value: "BlogForm Test" },
    });
    fireEvent.change(inputUrl, {
        target: { value: "127.0.0.1" },
    });
    fireEvent.submit(form);

    expect(addBlog.mock.calls).toHaveLength(1);
    expect(addBlog.mock.calls[0][0].title).toBe(
        "Testing of forms could be easier"
    );
    expect(addBlog.mock.calls[0][0].author).toBe("BlogForm Test");
    expect(addBlog.mock.calls[0][0].url).toBe("127.0.0.1");
});
