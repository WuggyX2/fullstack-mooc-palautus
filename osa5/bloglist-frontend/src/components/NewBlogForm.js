import React, { useState } from "react";

const NewBlogForm = ({ createBlog }) => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [url, setUrl] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        setAuthor("");
        setUrl("");
        setTitle("");
        createBlog({ title, author, url });
    };

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    Title:{" "}
                    <input
                        id="title"
                        type="text"
                        name="Title"
                        value={title}
                        onChange={({ target }) => setTitle(target.value)}
                    />
                </div>
                <div>
                    Author:{" "}
                    <input
                        id="author"
                        type="text"
                        name="Author"
                        value={author}
                        onChange={({ target }) => setAuthor(target.value)}
                    />
                </div>
                <div>
                    Url:{" "}
                    <input
                        id="url"
                        type="text"
                        name="Url"
                        value={url}
                        onChange={({ target }) => setUrl(target.value)}
                    />
                </div>
                <button type="submit">create</button>
            </form>
        </div>
    );
};

export default NewBlogForm;
