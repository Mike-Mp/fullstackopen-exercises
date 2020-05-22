const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogPosts) => {
  if (blogPosts.length === 0) {
    return 0;
  }
  if (blogPosts.length > 1) {
    let sum = 0;
    blogPosts.forEach((blogPost) => {
      sum += blogPost.likes;
    });
    return sum;
  } else {
    return blogPosts.likes;
  }
};

const favoriteBlog = (blogList) => {
  if (blogList.length === 0) {
    return 0;
  }

  let highestLiked = 0;
  let blogPost;

  blogList.forEach((blog) => {
    if (blog.likes > highestLiked) {
      highestLiked = blog.likes;
      blogPost = blog;
    }
  });
  return { blogPost, highestLiked };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
