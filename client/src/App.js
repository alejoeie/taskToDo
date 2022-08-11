import "./index.css";
import AppBar from "./components/AppBar";
import Signup from "../src/components/SignUp/Signup";
import Login from "./components/Login/Login";
import { Route, Routes } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <AppBar />
      {/* <Signup /> */}
      <Routes>
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
