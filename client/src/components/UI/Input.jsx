function Input({ label, error, icon, ...rest }) {
  return (
    <div className="input-group">
      {label && <label className="input-label">{label}</label>}
      <div className="input-wrapper">
        {icon && <span className="input-icon">{icon}</span>}
        <input
          className={`input-field${!icon ? ' input-no-icon' : ''}${error ? ' input-error' : ''}`}
          {...rest}
        />
      </div>
      {error && <p className="input-error-text">{error}</p>}
    </div>
  );
}

export default Input;
