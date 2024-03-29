import PropTypes from "prop-types";

const LoginForm = ({
    handleSubmit,
    handleUsernameChange,
    handlePasswordChange,
    username,
    password,
}) => {
    LoginForm.propTypes = {
        handleSubmit: PropTypes.func.isRequired,
        handleUsernameChange: PropTypes.func.isRequired,
        handlePasswordChange: PropTypes.func.isRequired,
        username: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired,
    };

    return (
        <div>
            <h2>Log in to application</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    username:{" "}
                    <input
                        type="text"
                        id="username"
                        name="Username"
                        username={username}
                        onChange={handleUsernameChange}
                    />{" "}
                </div>
                <div>
                    password:{" "}
                    <input
                        type="password"
                        id="password"
                        name="Password"
                        value={password}
                        onChange={handlePasswordChange}
                    />
                </div>
                <button id="login-button" type="submit">
                    login
                </button>
            </form>
        </div>
    );
};

export default LoginForm;
