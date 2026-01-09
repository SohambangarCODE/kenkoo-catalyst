function ActionCards({ onCardClick }) {
  const actions = [
    {
      id: 1,
      title: "Ask any healthcare question",
      subtitle: "",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      id: 2,
      title: "Upload a new health report",
      subtitle: "Analyze my latest results",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
          />
        </svg>
      ),
    },
    {
      id: 3,
      title: "Share a summary with family",
      subtitle: "Upload a new health report",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="w-full px-0 -mt-2 md:mt-0 lg:mt-2">
      <h2 className="text-lg md:text-xl lg:text-2xl xl:text-3xl font-semibold text-gray-800 mb-4 md:mb-6 text-center md:text-left">
        What would you like to do?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 lg:gap-4 xl:gap-6">
        {actions.map((action) => (
          <button
            key={action.id}
            onClick={() => onCardClick && onCardClick(action)}
            className="bg-white rounded-xl p-4 md:p-5 lg:p-4 xl:p-5 shadow-sm border border-blue-100 hover:border-blue-300 hover:shadow-lg transition-all duration-200 text-left flex flex-col items-start gap-3 md:gap-4 group cursor-pointer h-full"
          >
            <div className="w-12 h-12 md:w-14 md:h-14 lg:w-12 lg:h-12 xl:w-14 xl:h-14 rounded-lg bg-blue-50 flex items-center justify-center text-blue-500 group-hover:bg-blue-100 transition-colors shrink-0">
              {action.icon}
            </div>
            <div className="flex-1 min-w-0 w-full">
              <h3 className="font-medium text-gray-800 text-sm md:text-base lg:text-sm xl:text-base 2xl:text-lg">
                {action.title}
              </h3>
              {action.subtitle && (
                <p className="text-xs md:text-sm lg:text-xs xl:text-sm 2xl:text-base text-gray-500 mt-1">
                  {action.subtitle}
                </p>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default ActionCards;
