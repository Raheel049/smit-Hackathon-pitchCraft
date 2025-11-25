import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import SignUp from "./pages/SignUp";
import Dashbord from "./pages/dashbord";
import AuthRoute from "./routes/authRoute";
import PrivateRoute from "./routes/privateRoute";
import HistoryPage from "./pages/history";
import FeaturesPage from "./pages/features";
import ContactPage from "./pages/contact";
import ProfilePage from "./pages/profile";

export default function App() {
  return (
    <Routes>
      <Route element={<AuthRoute />}>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Route>

      <Route element={<PrivateRoute />}>
        <Route path="/dashbord" element={<Dashbord />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/features" element={<FeaturesPage />}/>
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/profile" element={<ProfilePage />} />

        
      </Route>
    </Routes>
  );
}

