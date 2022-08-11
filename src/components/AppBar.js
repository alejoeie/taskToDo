import React from "react";
import "./appbar.css";
function AppBar() {
  return (
    <div>
      <ul>
        <li>
          <a href="/">To do App</a>
        </li>
        <li>
          <a href="/">Tasks</a>
        </li>
        <li>
          <a href="/">User</a>
        </li>
        <li style={{ float: "right" }}>
          <a href="/">Logout</a>
        </li>
      </ul>
    </div>
  );
}

export default AppBar;
