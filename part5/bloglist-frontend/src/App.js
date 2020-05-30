import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import LoginForm from "./components/LoginForm";
import Notification from "./components/Notification";
import AddBlog from "./components/AddBlog";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState({ message: null, type: "" });
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem("loggedInBlogUser");

    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
      blogService.setToken(JSON.parse(loggedInUser).token);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();

    const credentials = {
      username,
      password,
    };

    try {
      const user = await loginService.loginUser(credentials);

      window.localStorage.setItem("loggedInBlogUser", JSON.stringify(user));

      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
      setNotification({
        message: `You have succesfully logged in as ${user.name}`,
        type: "ok",
      });
      setTimeout(() => {
        setNotification({ message: null, type: "" });
      }, 6000);
    } catch (exception) {
      setNotification({ message: "Wrong username or password", type: "error" });
      setTimeout(() => {
        setNotification({ message: null, type: "" });
      }, 5000);
    }
  };

  const handleLogout = (e) => {
    e.preventDefault();
    window.localStorage.removeItem("loggedInBlogUser");
    setUser(null);
    setNotification({ message: "Successfully logged out", type: "ok" });
    setTimeout(() => {
      setNotification({ message: null, type: null });
    }, 5000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newBlog = {
      title,
      author,
      url,
    };

    try {
      const savedBlog = await blogService.create(newBlog);

      setBlogs(blogs.concat(savedBlog));
      setTitle("");
      setAuthor("");
      setUrl("");
      setNotification({
        message: `${savedBlog.title} was successfully submitted`,
        type: "ok",
      });
      setTimeout(() => {
        setNotification({ message: null, type: null });
      }, 6000);
    } catch (exception) {
      setNotification({ message: exception.message, type: "error" });
      setTimeout(() => {
        setNotification({ message: null, type: null });
      }, 6000);
    }
  };

  if (user === null) {
    return (
      <div>
        <Notification message={notification.message} type={notification.type} />
        <LoginForm
          username={username}
          password={password}
          changeUsername={setUsername}
          changePassword={setPassword}
          handleSubmit={handleLogin}
        />
      </div>
    );
  }

  return (
    <div>
      <h2>blogs</h2>
      <div>
        <Notification message={notification.message} type={notification.type} />
        <p>{user.name} is logged in</p>
        <button onClick={handleLogout}>logout</button>
      </div>
      <AddBlog
        title={title}
        author={author}
        url={url}
        changeTitle={setTitle}
        changeAuthor={setAuthor}
        changeUrl={setUrl}
        handleSubmit={handleSubmit}
      />
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
