import "./Input.css";

export default function Input({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  error,
  rightElement,
  disabled = false,
  autoComplete,
}) {
  return (
    <div className="input-group">
      {label && (
        <label htmlFor={name} className="input-label">
          {label}
        </label>
      )}

      <div className={`input-wrapper ${error ? "has-error" : ""}`}>
        <input
          id={name}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          autoComplete={autoComplete}
        />

        {rightElement && (
          <div className="input-right">
            {rightElement}
          </div>
        )}
      </div>

      {error && (
        <span className="input-error">
          {error}
        </span>
      )}
    </div>
  );
}