// React
import { useState } from "react";
import { Link, useNavigate, useSearchParams, } from "react-router-dom";

// MUI
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

// Provider
import { useAuth } from "../../../providers/AuthProvider";

// Components
import AuthLayout from "../../../components/Auth/AuthLayout/AuthLayout";
import Input from "../../../components/ui/Input/Input";

// Styles
import "./Login.css";

// Login
export default function Login() {
  // Navigation
const navigate =
  useNavigate();

const [searchParams] =
  useSearchParams();

const isAddingAccount =
  searchParams.get(
    "addAccount",
  ) === "true";

  const { signIn } = useAuth();

  const [form, setForm] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const [errors, setErrors] = useState({});

  const [loading, setLoading] =
    useState(false);

  const [showPassword, setShowPassword] =
    useState(false);

  // Validate
  const validate = () => {
    const newErrors = {};

    if (!form.email.trim()) {
      newErrors.email =
        "Email is required.";
    }

    if (!form.password.trim()) {
      newErrors.password =
        "Password is required.";
    }

    return newErrors;
  };

  // Handle Change
  const handleChange = (e) => {
    const {
      name,
      value,
      type,
      checked,
    } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  // Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors =
      validate();

    if (
      Object.keys(validationErrors).length
    ) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      await signIn({
        email: form.email,
        password: form.password,
      });

      navigate("/");
      
    } catch (error) {
      setErrors({
        email:
          error.message ||
          "Login failed.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Sign In"
      subtitle="Continue to YouTube"
    >
      <form
        className="login-form"
        onSubmit={handleSubmit}
      >
        <Input
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Enter your email"
          error={errors.email}
        />

        <Input
          label="Password"
          name="password"
          type={
            showPassword
              ? "text"
              : "password"
          }
          value={form.password}
          onChange={handleChange}
          placeholder="Enter your password"
          error={errors.password}
          rightElement={
            <button
              type="button"
              className="password-toggle"
              onClick={() =>
                setShowPassword(
                  (prev) => !prev
                )
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

        <label className="remember-me">
          <input
            type="checkbox"
            name="remember"
            checked={form.remember}
            onChange={handleChange}
          />

          Remember Me
        </label>

        <Link
          to="/forgot-password"
          className="forgot-password-link"
        >
          Forgot Password?
        </Link>

        <button
          type="submit"
          className="login-btn"
          disabled={loading}
        >
          {loading
            ? "Signing In..."
            : "Sign In"}
        </button>
      </form>

      <div className="login-footer">
        <span>
          Don't have an account?
        </span>

        <Link to="/register">
          Create Account
        </Link>
      </div>
    </AuthLayout>
  );
}