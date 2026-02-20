function Button({ children, variant = 'primary', fullWidth, ...rest }) {
  const variantClass = `btn-${variant}`;

  return (
    <button
      className={`btn ${variantClass}${fullWidth ? ' btn-full' : ''}`}
      {...rest}
    >
      {children}
    </button>
  );
}

export default Button;
