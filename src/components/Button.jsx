function Button({ children, variant = 'primary', size = 'md', className = '', ...props }) {
  return (
    <button
      className={`${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
