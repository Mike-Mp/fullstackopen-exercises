import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/loginForm";
import blogService from "./services/blogs";
import loginService from "./services/login";
import AddBlog from "./components/AddBlog";
import Notification from "./components/Notification";
import axios from "axios";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem("loggedBlogappUser");
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  console.log("render");
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await loginService.loginUser({
        username,
        password,
      });

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      console.log(exception);
      setErrorMessage(exception.message);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    setUser(null);
    setErrorMessage("logged out");
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newBlog = {
      title: e.target.title.value,
      author: e.target.author.value,
      url: e.target.url.value,
    };

    console.log(newBlog);

    const response = await blogService.create(newBlog);
    setBlogs(blogs.concat(response));
    setErrorMessage(`${newBlog.title} by ${newBlog.author} added`);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };

  if (user === null) {
    return (
      <div>
        <Notification errorMessage={errorMessage} />
        <h2>Log in to application</h2>
        <LoginForm
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
          handleLogin={handleLogin}
        />
      </div>
    );
  }

  return (
    <div>
      <Notification errorMessage={errorMessage} />
      <h2>blogs</h2>
      <div>
        <p>{user.name} is logged in</p>
        <button onClick={handleLogout}>log out</button>
      </div>
      <AddBlog
        title={title}
        author={author}
        url={url}
        handleSubmit={handleSubmit}
        setTitle={setTitle}
        setAuthor={setAuthor}
        setUrl={setUrl}
      />
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
