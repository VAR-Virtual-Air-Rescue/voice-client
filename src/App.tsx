import { useState } from "react";
import "./App.css";
import Button from "./components/Button";
import TextBox from "./components/TextBox";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const connectFunction = () => {};

  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <TextBox
        placeholderText="Test"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      >
        Username
      </TextBox>
      <TextBox
        placeholderText="Test"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      >
        Password
      </TextBox>
      <Button onClick={() => connectFunction()}>Connect</Button>
    </div>
  );
};

export default App;
