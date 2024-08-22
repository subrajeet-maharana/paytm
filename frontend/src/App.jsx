import { Routes, Route, BrowserRouter } from "react-router-dom";
import Signup from "./components/custom/Signup";
import Signin from "./components/custom/Signin";
import Dashboard from "./components/custom/Dashboard";
import Send from "./components/custom/Send";
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/send" element={<Send />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
