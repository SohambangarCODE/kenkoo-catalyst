function Badge({ children, variant = 'default', className = '', ...props }) {
  return (
    <span
      className={`${className}`}
      {...props}
    >
      {children}
    </span>
  )
}

export default Badge
