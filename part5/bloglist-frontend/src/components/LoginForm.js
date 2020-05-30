import React from "react";

const LoginForm = ({
  username,
  password,
  changeUsername,
  changePassword,
  handleSubmit,
}) => (
  <div>
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          value={username}
          onChange={({ target }) => changeUsername(target.value)}
          name="username"
          id="username"
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={({ target }) => changePassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  </div>
);

export default LoginForm;
