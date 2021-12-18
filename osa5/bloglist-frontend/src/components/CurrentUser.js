const CurrentUser = ({ user, logoutHandler }) => {
    return (
        <div>
            <p>
                {user.name} logged in
                <button onClick={logoutHandler}>logout</button>
            </p>
        </div>
    );
};

export default CurrentUser;
