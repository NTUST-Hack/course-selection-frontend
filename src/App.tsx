import { Routes, Route } from "react-router-dom";
import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import HomePage from "./pages/HomePage";
import CoursesPage from "./pages/CoursesPage";
import AccountsPage from "./pages/AccountsPage";
import CourseDetailPage from "./pages/CourseDetailPage";
import AccountDetailPage from "./pages/AccountDetailPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/courses/:course_id" element={<CourseDetailPage />} />
        <Route path="/accounts" element={<AccountsPage />} />
        <Route path="/accounts/:account_id" element={<AccountDetailPage />} />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
