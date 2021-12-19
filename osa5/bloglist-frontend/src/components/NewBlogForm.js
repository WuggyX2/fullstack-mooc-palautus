const NewBlogForm = ({
    handleSubmit,
    title,
    author,
    url,
    handleTitleChange,
    handleAuthorChange,
    handleUrlChange,
}) => {
    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    Title:{" "}
                    <input
                        type="text"
                        name="Title"
                        value={title}
                        onChange={handleTitleChange}
                    />
                </div>
                <div>
                    Author:{" "}
                    <input
                        type="text"
                        name="Author"
                        value={author}
                        onChange={handleAuthorChange}
                    />
                </div>
                <div>
                    Url:{" "}
                    <input
                        type="text"
                        name="Url"
                        value={url}
                        onChange={handleUrlChange}
                    />
                </div>
                <button type="submit">create</button>
            </form>
        </div>
    );
};

export default NewBlogForm;
