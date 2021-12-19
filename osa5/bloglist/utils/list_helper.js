var collection = require("lodash/collection");

const dummy = (blogs) => {
    return 1;
};

const totalLikes = (blogs) => {
    return blogs.reduce((previousValue, currentValue) => {
        return previousValue + currentValue.likes;
    }, 0);
};

const favoriteBlog = (blogs) => {
    if (blogs && blogs.length > 0) {
        return blogs.reduce((max, blog) =>
            max.likes > blog.likes ? max : blog
        );
    } else {
        return {};
    }
};

const mostBlogs = (blogs) => {
    const groupedBlogs = collection.groupBy(blogs, (blog) => {
        return blog.author;
    });

    return Object.entries(groupedBlogs).reduce(
        (max, [key, val]) => {
            return val.length < max.blogs
                ? max
                : { author: key, blogs: val.length };
        },
        { author: "", blogs: 0 }
    );
};

const mostLikes = (blogs) => {
    const groupedBlogs = collection.groupBy(blogs, (blog) => {
        return blog.author;
    });

    return Object.entries(groupedBlogs).reduce(
        (max, [key, val]) => {
            const likeAmount = val.reduce((previous, current) => {
                return previous + current.likes;
            }, 0);

            return likeAmount < max.likes
                ? max
                : { author: key, likes: likeAmount };
        },
        { author: "", likes: 0 }
    );
};

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
};
