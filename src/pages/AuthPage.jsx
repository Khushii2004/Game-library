import React from "react";
import { SignIn, SignUp } from "@clerk/clerk-react";
import { useLocation } from "react-router-dom";
import "../css/AuthPage.css"; // Custom styles for the auth page

const AuthPage = () => {
  const location = useLocation();

  const isSignIn = location.pathname.includes("sign-in");

  return (
    <div className="auth-container d-flex justify-content-center align-items-center vh-100">
      {isSignIn ? (
        <SignIn path="/sign-in" routing="path" />
      ) : (
        <SignUp path="/sign-up" routing="path" />
      )}
    </div>
  );
};

export default AuthPage;
