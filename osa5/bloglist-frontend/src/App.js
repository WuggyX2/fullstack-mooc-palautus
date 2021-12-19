import React, { useState, useEffect } from "react";
import BlogList from "./components/BlogList";
import CurrentUser from "./components/CurrentUser";
import LoginForm from "./components/LoginForm";
import NewBlogForm from "./components/NewBlogForm";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState(null);
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [url, setUrl] = useState("");
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

    const handleNewBlog = async (event) => {
        event.preventDefault();
        try {
            const result = await blogService.createNew({ title, author, url });
            setAuthor("");
            setUrl("");
            setTitle("");
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
                    <NewBlogForm
                        handleSubmit={handleNewBlog}
                        url={url}
                        author={author}
                        title={title}
                        handleTitleChange={({ target }) =>
                            setTitle(target.value)
                        }
                        handleAuthorChange={({ target }) =>
                            setAuthor(target.value)
                        }
                        handleUrlChange={({ target }) => setUrl(target.value)}
                    />
                    <BlogList blogs={blogs} />
                </div>
            )}
        </div>
    );
};

export default App;
