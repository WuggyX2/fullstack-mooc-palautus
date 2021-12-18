import React from "react";
import Blog from "./Blog";

const BlogList = ({ blogs, user }) => {
    return (
        <div>
            <p>{user.name} logged in</p>
            <h2>Blogs</h2>
            {blogs.map((blog) => (
                <Blog key={blog.id} blog={blog} />
            ))}
        </div>
    );
};

export default BlogList;
