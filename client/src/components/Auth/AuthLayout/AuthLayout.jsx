import "./AuthLayout.css";

export default function AuthLayout({
  title,
  subtitle,
  children,
}) {
  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">
          {title}
        </h1>

        {subtitle && (
          <p className="auth-subtitle">
            {subtitle}
          </p>
        )}

        <div className="auth-content">
          {children}
        </div>

      </div>
    </div>
  );
}