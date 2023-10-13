import "./App.css";
import Button from "./components/Button";
import TextBox from "./components/TextBox";

const App = () => {
  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
      }}
    >
      <TextBox placeholderText="Test">Username</TextBox>
      <TextBox placeholderText="Test">Password</TextBox>
      <Button>Connect</Button>
    </div>
  );
};

export default App;
