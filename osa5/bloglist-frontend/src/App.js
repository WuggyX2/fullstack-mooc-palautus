import React, { useState, useEffect } from "react";
import BlogList from "./components/BlogList";
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

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await loginService.login({ username, password });
            setUsername("");
            setPassword("");
            setUser(response);
            blogService.setToken(response.token);
        } catch (error) {
            setErrorMessage("wrong credentials");
            setTimeout(() => {
                setErrorMessage(null);
            }, 5000);
        }
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
                <BlogList blogs={blogs} user={user} />
            )}
        </div>
    );
};

export default App;
