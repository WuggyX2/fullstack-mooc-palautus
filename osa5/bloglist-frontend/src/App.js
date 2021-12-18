import React, { useState, useEffect } from "react";
import BlogList from "./components/BlogList";
import CurrentUser from "./components/CurrentUser";
import LoginForm from "./components/LoginForm";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState(null);
    const [errorMessage, setErrorMessage] = useState(null);

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
            setErrorMessage("wrong credentials");
            setTimeout(() => {
                setErrorMessage(null);
            }, 5000);
        }
    };

    const handleLogout = () => {
        setUser(null);
        window.localStorage.removeItem("loggedBlogappUser");
    };

    return (
        <div>
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
                    <BlogList blogs={blogs} />
                </div>
            )}
        </div>
    );
};

export default App;
