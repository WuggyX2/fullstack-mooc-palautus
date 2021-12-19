import React, { useState, useEffect, useRef } from "react";
import BlogList from "./components/BlogList";
import CurrentUser from "./components/CurrentUser";
import LoginForm from "./components/LoginForm";
import NewBlogForm from "./components/NewBlogForm";
import Notification from "./components/Notification";
import Toggleable from "./components/Toggleable";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState(null);
    const [message, setMessage] = useState({ message: null, type: null });

    useEffect(() => {
        if (user != null) {
            blogService.getAll().then((blogs) => setBlogs(blogs));
        }
    }, [user]);

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON);
            setUser(user);
            blogService.setToken(user.token);
        }
    }, []);

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await loginService.login({ username, password });
            setUsername("");
            setPassword("");

            window.localStorage.setItem(
                "loggedBlogappUser",
                JSON.stringify(response)
            );

            setUser(response);
            blogService.setToken(response.token);
        } catch (error) {
            showMessage({
                message: error.response.data.error,
                type: "error",
            });
        }
    };

    const blogFormRef = useRef();

    const handleNewBlog = async (blogData) => {
        blogFormRef.current.toggleVisibility();
        try {
            const result = await blogService.createNew(blogData);
            setBlogs(blogs.concat(result));
            showMessage({
                message: `a bew blog ${result.title} by ${result.author} added`,
                type: "success",
            });
        } catch (error) {
            showMessage({
                message: `Blog creation failder error code: ${error.response.status}`,
                type: "error",
            });
        }
    };

    const showMessage = (message) => {
        setMessage(message);
        setTimeout(() => {
            setMessage({ message: null, type: null });
        }, 4000);
    };

    const handleLogout = () => {
        setUser(null);
        window.localStorage.removeItem("loggedBlogappUser");
    };

    const blogUpvote = async (id, upvotedBlog) => {
        try {
            await blogService.update(id, upvotedBlog);
            setBlogs(
                blogs.map((blog) => (blog.id !== id ? blog : upvotedBlog))
            );
        } catch (error) {
            showMessage({
                message: error.response.data.error,
                type: "error",
            });
        }
    };

    const blogRemove = async (blog) => {
        if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
            try {
                await blogService.remove(blog.id);
                setBlogs(
                    blogs.filter((b) => {
                        return b.id !== blog.id;
                    })
                );

                showMessage({
                    message: `Succesfully removed blog ${blog.title}`,
                    type: "success",
                });
            } catch (error) {
                const message = error.response.data.error
                    ? error.response.data.error
                    : "No permissions to remove that blog";
                showMessage({
                    message: message,
                    type: "error",
                });
            }
        }
    };

    return (
        <div>
            <Notification message={message.message} type={message.type} />
            {user == null ? (
                <LoginForm
                    username={username}
                    password={password}
                    handleUsernameChange={({ target }) =>
                        setUsername(target.value)
                    }
                    handlePasswordChange={({ target }) =>
                        setPassword(target.value)
                    }
                    handleSubmit={handleLogin}
                />
            ) : (
                <div>
                    <CurrentUser user={user} logoutHandler={handleLogout} />
                    <Toggleable buttonLabel="create new blog" ref={blogFormRef}>
                        <NewBlogForm createBlog={handleNewBlog} />
                    </Toggleable>

                    <BlogList
                        blogs={blogs}
                        removeClick={blogRemove}
                        likeClick={blogUpvote}
                    />
                </div>
            )}
        </div>
    );
};

export default App;
