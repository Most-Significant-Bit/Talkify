import React, { useEffect, useState } from "react";
import FloatingShape from "./components/FloatingShape";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Search from "./pages/Search";
import Upload from "./pages/Upload"
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";

// import { Toaster } from "react-hot-toast";

// protect routes that require authentication
// const ProtectedRoute = ({ children }) => {
//   const { isAuthenticated, user } = useAuthStore();

//   if (!isAuthenticated) {
//     return <Navigate to="/login" replace />;
//   }

//   if (!user.isVerified) {
//     return <Navigate to="/verify-email" replace />;
//   }

//   return children;
// };

// redirect authenticated users to the home page
// const RedirectAuthenticatedUser = ({ children }) => {
//   const { isAuthenticated, user } = useAuthStore();

//   if (isAuthenticated && user.isVerified) {
//     return <Navigate to="/" replace />;
//   }

//   return children;
// };

function App() {
  return (
    <>
      <div
        className="w-full bg-gradient-to-br
    from-gray-900 via-green-900 to-emerald-900 flex items-center justify-center relative overflow-hidden"
      >
        <FloatingShape
          color="bg-green-500"
          size="w-64 h-64"
          top="-5%"
          left="10%"
          delay={0}
        />
        <FloatingShape
          color="bg-emerald-500"
          size="w-48 h-48"
          top="70%"
          left="80%"
          delay={5}
        />
        <FloatingShape
          color="bg-lime-500"
          size="w-32 h-32"
          top="40%"
          left="-10%"
          delay={2}
        />
        <Routes>
          <Route path="/" element={"Home"} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/search" element={<Search />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/upload" element={<Upload />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
