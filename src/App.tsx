import { Routes, Route } from "react-router-dom";
import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Home from "./pages/Home";
import Courses from "./pages/Courses";
import Accounts from "./pages/Accounts";
import CourseDetail from "./pages/CourseDetail";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:course_id" element={<CourseDetail />} />
        <Route path="/accounts" element={<Accounts />} />
      </Routes>
    </div>
  );
}

export default App;
