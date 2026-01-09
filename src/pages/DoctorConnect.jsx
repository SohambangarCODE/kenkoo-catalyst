import { useState } from "react";

function DoctorConnect({ onBack }) {
  const [activeTab, setActiveTab] = useState("single");
  const [searchQuery, setSearchQuery] = useState("Diabetes");

  const doctors = [
    {
      id: 1,
      name: "Dr. Mehta",
      specialty: "Diabetologist",
      experience: "20 years' experience",
      qualifications: "M.D., DNB",
      rating: 4.9,
      reviews: 278,
      online: true,
      buttonText: "Consult",
      buttonColor: "bg-green-500 hover:bg-green-600",
      buttonIcon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      ),
    },
    {
      id: 2,
      name: "Dr. Sneha Patel",
      specialty: "Diabetologist",
      experience: "12 years",
      qualifications: "M.D., DM",
      rating: 4.8,
      reviews: 192,
      online: false,
      buttonText: "Call Now",
      buttonColor: "bg-blue-500 hover:bg-blue-600",
      buttonIcon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
          />
        </svg>
      ),
    },
    {
      id: 3,
      name: "Dr. Anshul Verma",
      specialty: "Diabetologist",
      experience: "15 years",
      qualifications: "M.B.B.S.",
      rating: 4.7,
      reviews: 216,
      online: false,
      buttonText: "Call Now",
      buttonColor: "bg-blue-500 hover:bg-blue-600",
      buttonIcon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 lg:bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 xl:px-12 py-4 md:py-6 lg:py-8">
        {/* Header with Back Button */}
        <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
          
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800">
            Consult Doctor
          </h1>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 md:gap-4 mb-4 md:mb-6 border-b border-gray-200">
          <button
            onClick={() => setActiveTab("single")}
            className={`px-4 py-2 md:px-6 md:py-3 text-sm md:text-base font-medium transition-colors border-b-2 ${
              activeTab === "single"
                ? "text-blue-500 border-blue-500"
                : "text-gray-500 border-transparent hover:text-gray-700"
            }`}
          >
            Single Consultation
          </button>
          <button
            onClick={() => setActiveTab("monthly")}
            className={`px-4 py-2 md:px-6 md:py-3 text-sm md:text-base font-medium transition-colors border-b-2 ${
              activeTab === "monthly"
                ? "text-blue-500 border-blue-500"
                : "text-gray-500 border-transparent hover:text-gray-700"
            }`}
          >
            Monthly Care Plans
          </button>
        </div>

        {/* Search Bar */}
        <div className="mb-6 md:mb-8">
          <div className="relative">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 md:h-6 md:w-6"
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
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Type your illness or symptoms"
              className="w-full pl-12 pr-14 py-3 md:py-4 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent text-sm md:text-base"
            />
            <button className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-500 hover:text-blue-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 md:h-6 md:w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Doctor Listings Section */}
        <div className="mb-6 md:mb-8">
          <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-800 mb-4 md:mb-6">
            Showing doctors for {searchQuery || "Diabetes"}
          </h2>

          {/* Doctor Cards - Horizontal Scroll on Mobile, Grid on Desktop */}
          <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 lg:gap-6 overflow-x-auto md:overflow-x-visible pb-2 md:pb-0 scrollbar-hide">
            {doctors.map((doctor) => (
              <div
                key={doctor.id}
                className="bg-white rounded-xl p-4 md:p-5 lg:p-6 shadow-sm border border-gray-100 min-w-[280px] md:min-w-0 flex-shrink-0 md:flex-shrink"
              >
                {/* Online Badge */}
                {doctor.online && (
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1.5 px-2 py-1 bg-green-50 rounded-full">
                      <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                      <span className="text-xs md:text-sm font-medium text-green-700">
                        Online Now
                      </span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3 md:h-4 md:w-4 text-green-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                  </div>
                )}

                {/* Doctor Profile Picture */}
                <div className="w-16 h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full bg-blue-100 flex items-center justify-center mb-3 md:mb-4 mx-auto">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 md:h-12 md:w-12 lg:h-14 lg:w-14 text-blue-500"
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

                {/* Doctor Info */}
                <div className="text-center mb-4">
                  <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-1">
                    {doctor.name}
                  </h3>
                  <p className="text-sm md:text-base text-gray-600 mb-1">
                    {doctor.specialty}
                  </p>
                  <p className="text-xs md:text-sm text-gray-500 mb-2">
                    {doctor.experience}
                  </p>
                  <p className="text-xs md:text-sm text-gray-500 mb-3">
                    {doctor.qualifications}
                  </p>

                  {/* Rating */}
                  <div className="flex items-center justify-center gap-1 mb-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 md:h-5 md:w-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                    <span className="text-sm md:text-base font-semibold text-gray-800">
                      {doctor.rating}
                    </span>
                    <span className="text-xs md:text-sm text-gray-500">
                      ({doctor.reviews} reviews)
                    </span>
                  </div>
                </div>

                {/* Action Button */}
                <button
                  className={`w-full ${doctor.buttonColor} text-white px-4 py-2 md:py-2.5 rounded-lg font-medium text-sm md:text-base flex items-center justify-center gap-2 transition-colors`}
                >
                  {doctor.buttonIcon}
                  {doctor.buttonText}
                </button>
              </div>
            ))}
          </div>

          {/* Links below doctor cards */}
          <div className="flex items-center justify-between mt-4 md:mt-6 text-sm md:text-base">
            <button className="text-blue-500 hover:text-blue-600 font-medium">
              Show all doctors for {searchQuery || "Diabetes"}
            </button>
            <button className="text-blue-500 hover:text-blue-600 font-medium flex items-center gap-1">
              See more specialists
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
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
            </button>
          </div>
        </div>

        {/* Ongoing Care Plan Section */}
        <div className="mb-6 md:mb-8">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-500 rounded-lg flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 md:h-6 md:w-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-gray-800">
              Looking for ongoing care?
            </h2>
          </div>
          <p className="text-sm md:text-base text-gray-600 mb-4">
            Basic Care Plan as pre.just{" "}
            <span className="font-semibold">₹299/mo</span>
          </p>

          {/* Care Plan Card */}
          <div className="bg-white rounded-xl p-5 md:p-6 lg:p-8 shadow-sm border border-gray-100">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 md:gap-6">
              <div className="flex-1">
                <h3 className="text-base md:text-lg lg:text-xl font-semibold text-gray-800 mb-4">
                  Basic Care Plan (1 consult/month)
                </h3>
                <ul className="space-y-2 md:space-y-3 mb-4">
                  {[
                    "Direct access to doctors for diabetes care",
                    "Health advice & prescription refills",
                    "Savings on ongoing care",
                  ].map((benefit, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 md:h-6 md:w-6 text-green-500 shrink-0 mt-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-sm md:text-base text-gray-700">
                        {benefit}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col items-center md:items-end gap-4">
                <div className="text-right">
                  <p className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800">
                    ₹299/m
                  </p>
                </div>
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 md:px-8 md:py-3.5 rounded-lg font-medium text-sm md:text-base transition-colors">
                  View Plans
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 lg:gap-6">
          {/* 24/7 Availability */}
          <div className="bg-white rounded-xl p-5 md:p-6 lg:p-8 shadow-sm border border-gray-100">
            <div className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 md:h-7 md:w-7 lg:h-8 lg:w-8 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                />
              </svg>
            </div>
            <h3 className="text-base md:text-lg lg:text-xl font-semibold text-gray-800 mb-2">
              24/7 Availability
            </h3>
            <p className="text-sm md:text-base text-gray-600">
              Doctors available anytime, day or night.
            </p>
          </div>

          {/* Consult Specialists */}
          <div className="bg-white rounded-xl p-5 md:p-6 lg:p-8 shadow-sm border border-gray-100">
            <div className="w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 md:h-7 md:w-7 lg:h-8 lg:w-8 text-blue-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                />
              </svg>
            </div>
            <h3 className="text-base md:text-lg lg:text-xl font-semibold text-gray-800 mb-2">
              Consult Specialists
            </h3>
            <p className="text-sm md:text-base text-gray-600">
              Find the right doctor for your condition.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorConnect;
