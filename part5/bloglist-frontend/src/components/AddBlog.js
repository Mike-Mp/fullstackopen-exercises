import React from "react";

const AddBlog = ({
  title,
  author,
  url,
  changeTitle,
  changeAuthor,
  changeUrl,
  handleSubmit,
}) => (
  <div>
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Title</label>
      <input
        type="text"
        value={title}
        onChange={({ target }) => changeTitle(target.value)}
        id="title"
      />
      <label htmlFor="author">Author</label>
      <input
        type="text"
        value={author}
        onChange={({ target }) => changeAuthor(target.value)}
        id="author"
      />
      <label htmlFor="url">Url</label>
      <input
        type="text"
        value={url}
        onChange={({ target }) => changeUrl(target.value)}
        id="url"
      />
      <button type="submit">submit blog</button>
    </form>
  </div>
);

export default AddBlog;
