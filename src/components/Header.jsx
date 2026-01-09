function Header({ className = "", ...props }) {
  return (
    <header
      className={`flex flex-col items-center lg:items-start justify-center py-6 px-4 lg:py-0 lg:px-0 ${className}`}
      {...props}
    >
      {/* Logo icon */}
      <div className="relative w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 xl:w-24 xl:h-24 bg-blue-500 rounded-full flex items-center justify-center mb-3 md:mb-4 lg:mb-6 shadow-lg">
        <img
          src="/Kenkoologo.jpg"
          alt="Kenkoo Logo"
          className="w-40 h-40 object-contain rounded-4xl"
        />
      </div>

      {/* App name */}
      <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-blue-500">
        Kenkoo
      </h1>
    </header>
  );
}

export default Header;
