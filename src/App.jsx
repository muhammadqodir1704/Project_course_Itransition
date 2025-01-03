import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import { FormProvider } from "./context/FormContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyForms from "./components/MyForms";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

// const login =
function App() {

  return (
    <FormProvider>
      <Router>
        <div className="App">
          <Navbar />
          <div className="container mx-auto p-4">
            <Routes>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route
                path="/"
                element={
                  <h1 className="text-center text-2xl">
                    Welcome to My Forms App!
                  </h1>
                }
              />
              <Route path="/login" element={<Login supabase={supabase} />} />
              <Route
                path="/register"
                element={<Register supabase={supabase} />}
              />
              <Route path="/myforms" element={<MyForms />} />
            </Routes>
          </div>
        </div>
      </Router>
    </FormProvider>
  );
}

export default App;
