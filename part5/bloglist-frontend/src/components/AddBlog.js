import React from "react";

const AddBlog = ({
  title,
  author,
  url,
  handleSubmit,
  setTitle,
  setAuthor,
  setUrl,
}) => (
  <div>
    <h2>create new</h2>
    <form onSubmit={handleSubmit}>
      title:
      <input
        type="text"
        value={title}
        name="title"
        onChange={({ target }) => setTitle(target.value)}
      />
      author:
      <input
        type="text"
        value={author}
        name="author"
        onChange={({ target }) => setAuthor(target.value)}
      />
      url:
      <input
        type="text"
        value={url}
        name="url"
        onChange={({ target }) => setUrl(target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  </div>
);

export default AddBlog;
