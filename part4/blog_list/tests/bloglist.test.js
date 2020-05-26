const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const helper = require("./bloglisthelper");

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogList = helper.initialBlogs.map((b) => new Blog(b));
  const blogPromises = blogList.map((b) => b.save());
  await Promise.all(blogPromises);
});

// verify that the blog list application returns the correct amount of blog posts in the JSON format
test("returns the right amount of blogs", async () => {
  // const blogList = await api.get("/api/blogs");
  const blogList = await Blog.find({});
  expect(blogList).toHaveLength(helper.initialBlogs.length);
});

test("content type is json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("unique identifier is named 'id'", async () => {
  const blogList = await api.get("/api/blogs");

  expect(blogList.body[0].id).toBeDefined();
});

test("succesfully creates a new blog post", async () => {
  const newBlog = {
    title: "title3",
    author: "author3",
    url: "www.someurl3.com",
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /json/);

  const blogsAtEnd = await helper.allBlogs();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

  const contents = blogsAtEnd.map((b) => b.title);

  expect(contents).toContain("title3");

  expect(blogsAtEnd[2].likes).toBe(0);
});

test("if title and url properties are missing, response is '400 Bad Request'", async () => {
  const newBlog = {
    author: "author3",
  };

  await api.post("/api/blogs").send(newBlog).expect(400);

  const blogsAtEnd = await helper.allBlogs();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
});

// describe("when a blog is deleted", () => {
//   test("blog is actually deleted", async () => {
//     // const blogsBefore = await Blog.find({});

//     await api.delete("api/blogs/5eccaf4fabdf614c13ce6b19").expect(204);
//     return;
//   });
// });

afterAll(() => {
  mongoose.connection.close();
});
