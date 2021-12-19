import Blog from "./Blog";

const BlogList = ({ blogs, removeClick, likeClick }) => {
    return (
        <div>
            <h2>Blogs</h2>
            {blogs
                .sort((a, b) => {
                    if (a.likes > b.likes) return -1;
                    if (a.likes < b.likes) return 1;
                    return 0;
                })
                .map((blog) => (
                    <Blog
                        key={blog.id}
                        blog={blog}
                        blogLike={likeClick}
                        blogRemove={removeClick}
                    />
                ))}
        </div>
    );
};

export default BlogList;
