function Input({ label, type = 'text', className = '', ...props }) {
  return (
    <div className="w-full">
      {label && (
        <label className="block">
          {label}
        </label>
      )}
      <input
        type={type}
        className={`${className}`}
        {...props}
      />
    </div>
  )
}

export default Input
