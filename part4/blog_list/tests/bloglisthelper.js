const Blog = require("../models/blog");

const initialBlogs = [
  {
    title: "title1",
    author: "author1",
    url: "www.someurl.com",
    likes: 5,
  },
  {
    title: "title2",
    author: "author2",
    url: "www.someurl2.com",
    likes: 10,
  },
];

const allBlogs = async () => {
  const blogList = await Blog.find({});
  return blogList.map((b) => b.toJSON());
};

module.exports = {
  initialBlogs,
  allBlogs,
};
