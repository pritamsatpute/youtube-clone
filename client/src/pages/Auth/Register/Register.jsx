// React
import { useState } from "react";

// React Router
import {
  Link,
  useNavigate,
} from "react-router-dom";

// MUI
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

// Provider
import { useAuth } from "../../../providers/AuthProvider";

// Components
import AuthLayout from "../../../components/Auth/AuthLayout/AuthLayout";
import Input from "../../../components/ui/Input/Input";

// Styles
import "./Register.css";

// Register
export default function Register() {
  // Navigation
  const navigate = useNavigate();

  // Auth
  const { signUp } = useAuth();

  // Form
  const [form, setForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  });

  // Errors
  const [errors, setErrors] =
    useState({});

  // Loading
  const [loading, setLoading] =
    useState(false);

  // Password Visibility
  const [showPassword, setShowPassword] =
    useState(false);

  const [
    showConfirmPassword,
    setShowConfirmPassword,
  ] = useState(false);

  // Handle Change
  const handleChange = (event) => {
    const {
      name,
      value,
      type,
      checked,
    } = event.target;

    const nextValue =
      type === "checkbox"
        ? checked
        : name === "username"
          ? value
              .toLowerCase()
              .replace(/[^a-z0-9_]/g, "")
          : value;

    setForm((previous) => ({
      ...previous,
      [name]: nextValue,
    }));

    // Clear Field Error
    if (errors[name]) {
      setErrors((previous) => ({
        ...previous,
        [name]: "",
      }));
    }
  };

  // Password Strength
  const getPasswordStrength = () => {
    const password =
      form.password;

    if (password.length < 6) {
      return "Weak";
    }

    if (
      /[A-Z]/.test(password) &&
      /[0-9]/.test(password) &&
      /[^A-Za-z0-9]/.test(password)
    ) {
      return "Strong";
    }

    return "Medium";
  };

  // Validate
  const validate = () => {
    const newErrors = {};

    // Name
    if (!form.name.trim()) {
      newErrors.name =
        "Name is required.";
    } else if (
      form.name.trim().length < 2
    ) {
      newErrors.name =
        "Name must be at least 2 characters.";
    }

    // Username
    if (!form.username.trim()) {
      newErrors.username =
        "Username is required.";
    } else if (
      form.username.length < 3
    ) {
      newErrors.username =
        "Username must be at least 3 characters.";
    } else if (
      form.username.length > 30
    ) {
      newErrors.username =
        "Username must be 30 characters or less.";
    } else if (
      !/^[a-z0-9_]+$/.test(
        form.username,
      )
    ) {
      newErrors.username =
        "Username can only contain letters, numbers, and underscores.";
    }

    // Email
    if (!form.email.trim()) {
      newErrors.email =
        "Email is required.";
    }

    // Password
    if (!form.password) {
      newErrors.password =
        "Password is required.";
    } else if (
      form.password.length < 6
    ) {
      newErrors.password =
        "Password must be at least 6 characters.";
    }

    // Confirm Password
    if (!form.confirmPassword) {
      newErrors.confirmPassword =
        "Please confirm your password.";
    } else if (
      form.confirmPassword !==
      form.password
    ) {
      newErrors.confirmPassword =
        "Passwords do not match.";
    }

    // Terms
    if (!form.acceptTerms) {
      newErrors.acceptTerms =
        "You must accept the Terms & Conditions.";
    }

    return newErrors;
  };

  // Submit
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate
    const validationErrors =
      validate();

    if (
      Object.keys(validationErrors)
        .length > 0
    ) {
      setErrors(validationErrors);

      return;
    }

    // Reset Errors
    setErrors({});

    // Loading
    setLoading(true);

    try {
      // Register
      await signUp({
        name:
          form.name.trim(),

        username:
          form.username.trim().toLowerCase(),

        email:
          form.email.trim().toLowerCase(),

        password:
          form.password,
      });

      // Redirect
      navigate("/");
    } catch (error) {
      console.error(
        "Registration error:",
        error,
      );

      // Backend Error
      const message =
        error.message ||
        "Registration failed.";

      if (
        message
          .toLowerCase()
          .includes("username")
      ) {
        setErrors({
          username: message,
        });
      } else if (
        message
          .toLowerCase()
          .includes("email")
      ) {
        setErrors({
          email: message,
        });
      } else {
        setErrors({
          email: message,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  // Render
  return (
    <AuthLayout
      title="Create your account"
      subtitle="Join YouTube"
    >
      <form
        className="register-form"
        onSubmit={handleSubmit}
      >
        {/* Name */}
        <Input
          label="Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Enter your name"
          error={errors.name}
        />

        {/* Username */}
        <Input
          label="Username"
          name="username"
          value={form.username}
          onChange={handleChange}
          placeholder="Choose a username"
          error={errors.username}
        />

        {/* Username Hint */}
        {!errors.username && (
          <span className="username-hint">
            Use letters, numbers, and
            underscores only.
          </span>
        )}

        {/* Email */}
        <Input
          label="Email"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Enter your email"
          error={errors.email}
        />

        {/* Password */}
        <Input
          label="Password"
          type={
            showPassword
              ? "text"
              : "password"
          }
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Create a password"
          error={errors.password}
          rightElement={
            <button
              type="button"
              className="password-toggle"
              aria-label={
                showPassword
                  ? "Hide password"
                  : "Show password"
              }
              onClick={() =>
                setShowPassword(
                  (previous) =>
                    !previous,
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

        {/* Password Strength */}
        {form.password && (
          <div
            className={`password-strength ${getPasswordStrength().toLowerCase()}`}
          >
            Strength:{" "}
            {getPasswordStrength()}
          </div>
        )}

        {/* Confirm Password */}
        <Input
          label="Confirm Password"
          type={
            showConfirmPassword
              ? "text"
              : "password"
          }
          name="confirmPassword"
          value={
            form.confirmPassword
          }
          onChange={handleChange}
          placeholder="Confirm your password"
          error={
            errors.confirmPassword
          }
          rightElement={
            <button
              type="button"
              className="password-toggle"
              aria-label={
                showConfirmPassword
                  ? "Hide password"
                  : "Show password"
              }
              onClick={() =>
                setShowConfirmPassword(
                  (previous) =>
                    !previous,
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

        {/* Terms */}
        <label className="terms-checkbox">
          <input
            type="checkbox"
            name="acceptTerms"
            checked={
              form.acceptTerms
            }
            onChange={handleChange}
          />

          <span>
            I agree to the Terms &
            Conditions
          </span>
        </label>

        {errors.acceptTerms && (
          <span className="input-error">
            {errors.acceptTerms}
          </span>
        )}

        {/* Submit */}
        <button
          type="submit"
          className="register-btn"
          disabled={loading}
        >
          {loading
            ? "Creating Account..."
            : "Create Account"}
        </button>
      </form>

      {/* Login Link */}
      <p className="auth-footer">
        Already have an account?{" "}
        <Link to="/login">
          Sign In
        </Link>
      </p>
    </AuthLayout>
  );
}