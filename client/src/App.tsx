import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/layout/Header";
import PrivateRoute from "./components/auth/PrivateRoute";
import {
  Home,
  Dashboard,
  Login,
  Register,
  ProjectDetails,
  NotFound,
  Profile,
} from "./pages";
import { useAtom } from "jotai";
import { userAtom } from "./jotai/atoms";

function App() {
  const [user] = useAtom(userAtom);
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="/projects/:id"
              element={
                <PrivateRoute>
                  <ProjectDetails />
                </PrivateRoute>
              }
            />

            <Route
              path="/"
              element={
                user ? (
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                ) : (
                  <Home />
                )
              }
            />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
