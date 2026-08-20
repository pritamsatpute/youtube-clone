import { useState } from "react";
import { Link } from "react-router-dom";

import AuthLayout from "../../../components/Auth/AuthLayout/AuthLayout";
import Input from "../../../components/ui/Input/Input";

import "./ForgotPassword.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setError("Email is required.");
      return;
    }

    setError("");
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1500);
  };

  return (
    <AuthLayout
      title="Forgot Password?"
      subtitle="Enter your email to receive a password reset link."
    >
      {success ? (
        <div className="forgot-success">
          <h3>Check your email</h3>

          <p>
            If an account exists with this email address, we've sent a password
            reset link.
          </p>

          <Link to="/login" className="back-login">
            Back to Sign In
          </Link>
        </div>
      ) : (
        <>
          <form
            className="forgot-form"
            onSubmit={handleSubmit}
          >
            <Input
              label="Email"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              error={error}
            />

            <button
              className="forgot-btn"
              disabled={loading}
              type="submit"
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>

          <p className="auth-footer">
            Remember your password?{" "}
            <Link to="/login">Sign In</Link>
          </p>
        </>
      )}
    </AuthLayout>
  );
}