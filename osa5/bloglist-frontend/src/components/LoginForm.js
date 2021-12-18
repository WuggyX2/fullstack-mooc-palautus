const LoginForm = ({
    handleSubmit,
    handleUsernameChange,
    handlePasswordChange,
    username,
    password,
}) => {
    return (
        <div>
            <h2>Log in to application</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    username:{" "}
                    <input
                        type="text"
                        name="Username"
                        username={username}
                        onChange={handleUsernameChange}
                    />{" "}
                </div>
                <div>
                    password:{" "}
                    <input
                        type="password"
                        name="Password"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </div>
                <button type="submit">login</button>
            </form>
        </div>
    );
};

export default LoginForm;
