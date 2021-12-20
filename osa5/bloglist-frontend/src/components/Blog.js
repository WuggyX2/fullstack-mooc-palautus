import React, { useState } from "react";
import "../index.css";
import PropTypes from "prop-types";

const Blog = ({ blog, blogLike, blogRemove }) => {
    const [visible, setVisible] = useState(false);

    const toggleVisibility = () => {
        setVisible(!visible);
    };

    const upvoteBlog = (event) => {
        event.preventDefault();
        blogLike(blog.id, {
            id: blog.id,
            user: blog.user === null ? "" : blog.user,
            likes: blog.likes + 1,
            author: blog.author,
            title: blog.title,
            url: blog.url,
        });
    };

    const removeBlog = (event) => {
        event.preventDefault();

        blogRemove(blog);
    };

    Blog.propTypes = {
        blog: PropTypes.object.isRequired,
        blogLike: PropTypes.func.isRequired,
        blogRemove: PropTypes.func.isRequired,
    };

    return (
        <div className="blogBlock">
            {blog.title} {blog.author}{" "}
            <button onClick={toggleVisibility}>
                {visible ? "hide" : "view"}
            </button>
            <div style={visible ? { display: "" } : { display: "none" }}>
                <div>{blog.url}</div>
                <div>
                    likes {blog.likes}{" "}
                    <button onClick={upvoteBlog}> Like</button>
                </div>
                <div>{blog.user ? blog.user.name : "No user"}</div>
                <button onClick={removeBlog}> remove</button>
            </div>
        </div>
    );
};

export default Blog;
