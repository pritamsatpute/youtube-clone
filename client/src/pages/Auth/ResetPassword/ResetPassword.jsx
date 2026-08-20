import { useState } from "react";
import { Link } from "react-router-dom";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

import AuthLayout from "../../../components/Auth/AuthLayout/AuthLayout";
import Input from "../../../components/ui/Input/Input";

import "./ResetPassword.css";

export default function ResetPassword() {
  const [form, setForm] = useState({
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const getPasswordStrength = () => {
    const password = form.password;

    if (password.length < 6) return "Weak";

    if (
      /[A-Z]/.test(password) &&
      /[0-9]/.test(password) &&
      /[^A-Za-z0-9]/.test(password)
    ) {
      return "Strong";
    }

    return "Medium";
  };

  const validate = () => {
    const newErrors = {};

    if (!form.password) {
      newErrors.password = "Password is required.";
    } else if (form.password.length < 6) {
      newErrors.password =
        "Password must be at least 6 characters.";
    }

    if (form.confirmPassword !== form.password) {
      newErrors.confirmPassword =
        "Passwords do not match.";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1500);
  };

  if (success) {
    return (
      <AuthLayout
        title="Password Updated"
        subtitle="Your password has been reset successfully."
      >
        <div className="reset-success">
          <p>
            You can now sign in using your new password.
          </p>

          <Link
            to="/login"
            className="login-link"
          >
            Go to Sign In
          </Link>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Reset Password"
      subtitle="Choose a strong password."
    >
      <form
        className="reset-form"
        onSubmit={handleSubmit}
      >
        <Input
          label="New Password"
          type={showPassword ? "text" : "password"}
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Enter new password"
          error={errors.password}
          rightElement={
            <button
              type="button"
              className="password-toggle"
              onClick={() =>
                setShowPassword((prev) => !prev)
              }
            >
              {showPassword ? (
                <VisibilityOffOutlinedIcon />
              ) : (
                <VisibilityOutlinedIcon />
              )}
            </button>
          }
        />

        {form.password && (
          <div
            className={`password-strength ${getPasswordStrength().toLowerCase()}`}
          >
            Strength: {getPasswordStrength()}
          </div>
        )}

        <Input
          label="Confirm Password"
          type={
            showConfirmPassword ? "text" : "password"
          }
          name="confirmPassword"
          value={form.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm new password"
          error={errors.confirmPassword}
          rightElement={
            <button
              type="button"
              className="password-toggle"
              onClick={() =>
                setShowConfirmPassword(
                  (prev) => !prev
                )
              }
            >
              {showConfirmPassword ? (
                <VisibilityOffOutlinedIcon />
              ) : (
                <VisibilityOutlinedIcon />
              )}
            </button>
          }
        />

        <button
          className="reset-btn"
          type="submit"
          disabled={loading}
        >
          {loading
            ? "Updating..."
            : "Update Password"}
        </button>
      </form>
    </AuthLayout>
  );
}