function Hero({ className = "", onFloatingIconClick, ...props }) {
  // Floating icon data with click handlers - responsive positions for mobile and desktop
  const floatingIcons = [
    {
      id: 1,
      position: "-top-2 -left-2 md:top-3 md:left-3",
      delay: "delay-0",
      label: "Search health documents",
    },
    {
      id: 2,
      position: "-top-2 -right-2 md:top-3 md:right-3",
      delay: "delay-75",
      label: "Secure health data",
    },
    {
      id: 3,
      position: "-bottom-2 -left-2 md:bottom-3 md:left-3",
      delay: "delay-150",
      label: "Medication tracking",
    },
    {
      id: 4,
      position: "-bottom-2 -right-2 md:bottom-3 md:right-3",
      delay: "delay-200",
      label: "Health reports",
    },
  ];

  return (
    <section className={`w-full py-4 md:py-6 ${className}`} {...props}>
      {/* Header with Title and Robot Image side by side */}
      <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-4 md:gap-6 lg:gap-8 mb-4 md:mb-5">
        {/* Left: Title and Subtitle */}
        <div className="flex-1">
          <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold text-gray-800 mb-2 md:mb-3 lg:mb-4 text-center md:text-left">
            Welcome to Kenkoo.
          </h2>
          <p className="text-sm md:text-base lg:text-lg xl:text-xl text-gray-600 text-center md:text-left">
            Scan. Analyze. Share your health journey.
          </p>
        </div>

        {/* Right: Robot Image with floating icons */}
        <div className="relative shrink-0">
          <div className="relative w-40 h-40 md:w-52 md:h-52 lg:w-64 lg:h-64 xl:w-72 xl:h-72 2xl:w-90 2xl:h-80">
            {/* Soft background glow */}
            <div className="absolute inset-0 bg-blue-100 rounded-full blur-2xl opacity-30"></div>

            {/* Floating circular icons - positioned outside image on mobile */}
            {floatingIcons.map((icon) => (
              <button
                key={icon.id}
                onClick={() =>
                  onFloatingIconClick && onFloatingIconClick(icon.id)
                }
                className={`absolute ${icon.position} w-8 h-8 md:w-12 md:h-12 lg:w-14 lg:h-14 bg-white rounded-full shadow-lg flex items-center justify-center animate-float ${icon.delay} hover:scale-110 hover:shadow-xl transition-all duration-200 cursor-pointer group z-10`}
                aria-label={icon.label}
                title={icon.label}
              >
                {icon.id === 1 && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 md:h-6 md:w-6 lg:h-7 lg:w-7 text-blue-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                )}
                {icon.id === 2 && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 md:h-6 md:w-6 lg:h-7 lg:w-7 text-blue-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                )}
                {icon.id === 3 && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 md:h-6 md:w-6 lg:h-7 lg:w-7 text-blue-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                    />
                  </svg>
                )}
                {icon.id === 4 && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 md:h-6 md:w-6 lg:h-7 lg:w-7 text-blue-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                )}
              </button>
            ))}

            {/* Robot Image */}
            <img
              src="/kenkoorobo.png"
              alt="Kenkoo Healthcare AI Robot"
              className="w-full h-full object-contain drop-shadow-xl rounded-3xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
