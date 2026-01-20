function Reports() {
  // Report categories data
  const reportCategories = [
    {
      id: 1,
      title: "Pathology Reports",
      count: 12,
      date: "Feb 12",
      abnormal: 2,
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
            d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
          />
        </svg>
      ),
      iconColor: "text-red-500",
      bgColor: "bg-red-50",
    },
    {
      id: 2,
      title: "Prescriptions",
      count: 8,
      date: "Feb 9",
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
            d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
          />
        </svg>
      ),
      iconColor: "text-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      id: 3,
      title: "Discharge Summaries",
      count: 5,
      date: "Jan 24",
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
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          />
        </svg>
      ),
      iconColor: "text-green-500",
      bgColor: "bg-green-50",
    },
    {
      id: 4,
      title: "Imaging Reports",
      count: 0,
      comingSoon: true,
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
            d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
          />
        </svg>
      ),
      iconColor: "text-purple-500",
      bgColor: "bg-purple-50",
    },
    {
      id: 5,
      title: "Radiology Reports",
      count: 3,
      date: "Feb 4",
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
            d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
          />
        </svg>
      ),
      iconColor: "text-yellow-500",
      bgColor: "bg-yellow-50",
    },
  ];

  // Recent reports data
  const recentReports = [
    {
      id: 1,
      title: "CBC + Lipid Profile",
      date: "Feb 12, 2024",
      abnormal: 2,
    },
    {
      id: 2,
      title: "Prescription: Dr. Mehta - Diabetes",
      date: "Feb 9, 2024",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 lg:bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 xl:px-12 py-4 md:py-6 lg:py-8">
        {/* Profile Section */}
        <div className="bg-white rounded-xl p-4 md:p-5 lg:p-6 mb-6 md:mb-8 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 md:gap-4">
              {/* Profile Picture */}
              <div className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 md:h-10 md:w-10 text-blue-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>

              {/* User Info */}
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-base md:text-lg lg:text-xl font-semibold text-gray-800">
                    Rahul Sharma
                  </h3>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 md:h-5 md:w-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
                <p className="text-xs md:text-sm text-gray-500 mt-1">
                  Age: 58 • Male
                </p>
              </div>
            </div>

            {/* Add New Button */}
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 md:px-5 md:py-2.5 lg:px-6 lg:py-3 rounded-lg text-sm md:text-base font-medium transition-colors shrink-0">
              + Add new
            </button>
          </div>
        </div>

        {/* My Reports Section */}
        <div className="mb-6 md:mb-8">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#109def] mb-2">
            My Reports
          </h2>
          <p className="text-sm md:text-base text-gray-600 mb-4 md:mb-6">
            Review and manage all of Rahul's medical documents.
          </p>

          {/* Report Categories */}
          <div className="space-y-3 md:space-y-4">
            {reportCategories.map((category) => (
              <button
                key={category.id}
                className="w-full bg-white rounded-xl p-4 md:p-5 lg:p-6 shadow-sm border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all duration-200 text-left flex items-center justify-between group"
                disabled={category.comingSoon}
              >
                <div className="flex items-center gap-4 md:gap-5 flex-1">
                  {/* Icon */}
                  <div
                    className={`${category.bgColor} ${category.iconColor} w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-lg flex items-center justify-center shrink-0`}
                  >
                    {category.icon}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base md:text-lg lg:text-xl font-semibold text-gray-800 mb-1">
                      {category.title}
                    </h3>
                    {category.comingSoon ? (
                      <div className="flex items-center gap-2">
                        <span className="text-sm md:text-base text-gray-500">
                          Coming Soon
                        </span>
                        <span className="px-2 py-1 bg-gray-100 text-gray-500 text-xs md:text-sm rounded-full">
                          Coming Soon
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm md:text-base text-gray-600">
                          {category.count}{" "}
                          {category.count === 1 ? "report" : "reports"}
                        </span>
                        <span className="text-gray-400">•</span>
                        <span className="text-sm md:text-base text-gray-600">
                          {category.date}
                        </span>
                        {category.abnormal && (
                          <>
                            <span className="text-gray-400">•</span>
                            <span className="text-sm md:text-base text-red-500 font-medium">
                              {category.abnormal} abnormal
                            </span>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Chevron */}
                {!category.comingSoon && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 md:h-6 md:w-6 text-gray-400 group-hover:text-blue-500 transition-colors shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Recent Reports Section */}
        <div>
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#109def]">
              Recent Reports
            </h2>
            <button className="text-blue-500 hover:text-blue-600 text-sm md:text-base font-medium transition-colors">
              View All
            </button>
          </div>

          {/* Recent Report Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 lg:gap-6">
            {recentReports.map((report) => (
              <button
                key={report.id}
                className="bg-white rounded-xl p-4 md:p-5 lg:p-6 shadow-sm border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all duration-200 text-left"
              >
                <h3 className="text-base md:text-lg lg:text-xl font-semibold text-gray-800 mb-2">
                  {report.title}
                </h3>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm md:text-base text-gray-600">
                    {report.date}
                  </span>
                  {report.abnormal && (
                    <>
                      <span className="text-gray-400">•</span>
                      <div className="flex items-center gap-1">
                        <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                        <span className="text-sm md:text-base text-red-500 font-medium">
                          {report.abnormal} abnormal values
                        </span>
                      </div>
                    </>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reports;
