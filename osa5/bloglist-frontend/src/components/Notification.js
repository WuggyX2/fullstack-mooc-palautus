import "../index.css";

const Notification = ({ message, type }) => {
    if (message) {
        return (
            <div
                className={
                    type === "success" ? "successMessage" : "errorMessage"
                }
            >
                {message}
            </div>
        );
    }
    return null;
};

export default Notification;
