import React from "react";

const loginForm = ({
  username,
  password,
  setUsername,
  setPassword,
  handleLogin,
}) => (
  <div>
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
          name="Username"
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          name="Password"
        />
      </div>
      <button type="submit">login</button>
    </form>
  </div>
);

export default loginForm;
