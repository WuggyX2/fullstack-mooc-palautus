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

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
};
