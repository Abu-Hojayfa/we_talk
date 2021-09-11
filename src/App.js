import React, { useEffect, useState } from "react";
import "./App.css";
import { io } from "socket.io-client";

function App() {
  const [state, setState] = useState("");
  const [msgs, setmsgs] = useState("");
  const socket = io.connect("http://localhost:5000");

  const okaygo = (e) => {
    e.preventDefault();
    socket.emit("chat message", state);
    setState("");
  };

  useEffect(() => {
    socket.on("message", (msg) => {
      setmsgs(msg);
    });
  }, [socket]);

  return (
    <div className="App">
      <input
        onBlur={(e) => {
          setState(e.target.value);
        }}
      />
      <button onClick={(e) => okaygo(e)}>okay</button>
      <h1>You Said: {msgs}</h1>
    </div>
  );
}

export default App;
