function HealthOverview() {
  // Sample blood test report data
  const bloodTestReport = {
    patientName: "Hardik Sompura",
    age: 41,
    gender: "Male",
    reportDate: "20 February 2023",

    summary: {
      status: "Attention Needed",
      message:
        "HbA1c, fasting blood sugar, triglycerides, homocysteine, IgE, Vitamin D and Vitamin B12 levels are abnormal.",
      color: "orange",
    },

    keyResults: [
      {
        name: "HbA1c",
        value: "7.1 %",
        status: "High",
        indicator: "up",
        color: "orange",
        normalRange: "< 5.7 %",
      },
      {
        name: "Fasting Blood Sugar",
        value: "141 mg/dL",
        status: "High",
        indicator: "up",
        color: "orange",
        normalRange: "74 – 106 mg/dL",
      },
      {
        name: "Total Cholesterol",
        value: "189 mg/dL",
        status: "Normal",
        indicator: "normal",
        color: "green",
        normalRange: "< 200 mg/dL",
      },
      {
        name: "Triglycerides",
        value: "168 mg/dL",
        status: "High",
        indicator: "up",
        color: "orange",
        normalRange: "< 150 mg/dL",
      },
      {
        name: "LDL Cholesterol",
        value: "100.39 mg/dL",
        status: "Borderline",
        indicator: "up",
        color: "orange",
        normalRange: "< 100 mg/dL",
      },
      {
        name: "Creatinine",
        value: "0.83 mg/dL",
        status: "Normal",
        indicator: "normal",
        color: "green",
        normalRange: "0.66 – 1.25 mg/dL",
      },
      {
        name: "Vitamin D (25-OH)",
        value: "8.98 ng/mL",
        status: "Deficient",
        indicator: "down",
        color: "orange",
        normalRange: "30 – 100 ng/mL",
      },
      {
        name: "Vitamin B12",
        value: "< 148 pg/mL",
        status: "Low",
        indicator: "down",
        color: "orange",
        normalRange: "187 – 833 pg/mL",
      },
    ],

    trends: [
      {
        name: "HbA1c",
        values: [6.2, 6.5, 6.8, 7.0, 7.2, 7.5],
        dates: ["Feb 2023"],
        color: "orange",
        latest: 7.1,
      },
      {
        name: "Fasting Blood Sugar",
        values: [120, 125, 130, 135, 140, 145],
        dates: ["Feb 2023"],
        color: "orange",
        latest: 141,
      },
      {
        name: "Triglycerides",
        values: [0.9, 0.95, 1.0, 0.98, 0.95, 1.0],
        dates: ["Feb 2023"],
        color: "orange",
        latest: 168,
      },
      {
        name: "Creatinine",
        values: [120, 125, 130, 135, 140, 145],
        dates: ["Feb 2023"],
        color: "green",
        latest: 0.83,
      },
    ],

    insights: [
      {
        type: "warning",
        message:
          "HbA1c and fasting blood sugar indicate poor glycemic control and risk of diabetes complications.",
      },
      {
        type: "warning",
        message:
          "Vitamin D and Vitamin B12 levels are severely low and require supplementation.",
      },
      {
        type: "warning",
        message:
          "Triglycerides and LDL cholesterol are borderline high, increasing cardiovascular risk.",
      },
      {
        type: "warning",
        message:
          "Elevated homocysteine and IgE may increase cardiovascular and allergic risk respectively.",
      },
    ],

    recommendations: [
      "Consult physician for diabetes management and HbA1c control",
      "Start Vitamin D and Vitamin B12 supplementation as advised",
      "Reduce sugar and refined carbohydrate intake",
      "Increase physical activity (30–45 min/day)",
      "Repeat HbA1c and lipid profile in 3 months",
    ],
  };

  // Calculate trend line positions for SVG
  const calculateTrendLine = (values, maxValue, minValue, width, height) => {
    const range = maxValue - minValue || 1;
    const points = values.map((value, index) => {
      const x = (index / (values.length - 1)) * width;
      const y = height - ((value - minValue) / range) * height;
      return `${x},${y}`;
    });
    return points.join(" ");
  };

  return (
    <div className="min-h-screen bg-gray-50 lg:bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 xl:px-12 py-4 md:py-6 lg:py-8">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-[#109def] mb-2">
            Health Overview
          </h1>
          <p className="text-sm md:text-base text-gray-600">
            Comprehensive view of your health metrics and reports
          </p>
        </div>

        {/* Blood Test Report Card */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-6 lg:p-8 mb-6 md:mb-8">
          {/* Report Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 md:mb-8 gap-4">
            <div>
              <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-[#109def] mb-1">
                Blood Test Report
              </h2>
              <div className="flex flex-wrap items-center gap-2 md:gap-3 text-sm md:text-base text-gray-600">
                <span>{bloodTestReport.patientName}</span>
                <span className="text-gray-400">•</span>
                <span>Age: {bloodTestReport.age}</span>
                <span className="text-gray-400">•</span>
                <span>{bloodTestReport.gender}</span>
                <span className="text-gray-400">•</span>
                <span>{bloodTestReport.reportDate}</span>
              </div>
            </div>
            <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 md:px-6 md:py-3 rounded-lg text-sm md:text-base font-medium transition-colors shrink-0">
              Full Report
            </button>
          </div>

          {/* Report Summary */}
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 md:p-5 mb-6 md:mb-8">
            <div className="flex items-start gap-3">
              <div className="shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 md:h-8 md:w-8 text-orange-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-base md:text-lg font-semibold text-orange-800 mb-1">
                  {bloodTestReport.summary.status}
                </h3>
                <p className="text-sm md:text-base text-orange-700">
                  {bloodTestReport.summary.message}
                </p>
              </div>
            </div>
          </div>

          {/* Key Results */}
          <div className="mb-6 md:mb-8">
            <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-[#156a9b] mb-4 md:mb-6">
              Key Results
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              {bloodTestReport.keyResults.map((result, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-lg p-4 md:p-5 border border-gray-200"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h4 className="text-sm md:text-base font-semibold text-gray-800 mb-1">
                        {result.name}
                      </h4>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-base md:text-lg lg:text-xl font-bold text-gray-900">
                          {result.value}
                        </span>
                        <span
                          className={`text-xs md:text-sm font-medium px-2 py-1 rounded-full ${
                            result.color === "orange"
                              ? "bg-orange-100 text-orange-700"
                              : "bg-green-100 text-green-700"
                          }`}
                        >
                          {result.status}
                        </span>
                      </div>
                    </div>
                    <div className="shrink-0">
                      {result.indicator === "up" ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 md:h-8 md:w-8 text-orange-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 md:h-8 md:w-8 text-green-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      )}
                    </div>
                  </div>
                  <p className="text-xs md:text-sm text-gray-600 mt-2">
                    Normal: {result.normalRange}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Trends Over Time */}
          <div className="mb-6 md:mb-8">
            <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-[#156a9b] mb-4 md:mb-6">
              Trends Over Time
            </h3>
            <div className="space-y-6 md:space-y-8">
              {bloodTestReport.trends.map((trend, index) => {
                const maxValue = Math.max(...trend.values) * 1.1;
                const minValue = Math.min(...trend.values) * 0.9;
                const width = 300;
                const height = 120;

                return (
                  <div
                    key={index}
                    className="bg-gray-50 rounded-lg p-4 md:p-6 border border-gray-200"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-base md:text-lg font-semibold text-gray-800">
                        {trend.name}
                      </h4>
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-xs md:text-sm font-medium ${
                            trend.color === "orange"
                              ? "text-orange-600"
                              : "text-green-600"
                          }`}
                        >
                          Latest: {trend.latest}
                          {trend.name === "HbA1c"
                            ? "%"
                            : trend.name === "LDL Cholesterol"
                            ? " mg/dL"
                            : " mg/dL"}
                        </span>
                      </div>
                    </div>
                    <div className="overflow-x-auto">
                      <svg
                        width={width}
                        height={height}
                        className="min-w-full"
                        viewBox={`0 0 ${width} ${height}`}
                      >
                        {/* Grid lines */}
                        {[0, 1, 2, 3, 4].map((i) => (
                          <line
                            key={i}
                            x1={0}
                            y1={(i * height) / 4}
                            x2={width}
                            y2={(i * height) / 4}
                            stroke="#e5e7eb"
                            strokeWidth={1}
                          />
                        ))}
                        {/* Trend line */}
                        <polyline
                          points={calculateTrendLine(
                            trend.values,
                            maxValue,
                            minValue,
                            width,
                            height
                          )}
                          fill="none"
                          stroke={
                            trend.color === "orange" ? "#f97316" : "#10b981"
                          }
                          strokeWidth={3}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        {/* Data points */}
                        {trend.values.map((value, i) => {
                          const x = (i / (trend.values.length - 1)) * width;
                          const y =
                            height -
                            ((value - minValue) / (maxValue - minValue)) *
                              height;
                          return (
                            <circle
                              key={i}
                              cx={x}
                              cy={y}
                              r={4}
                              fill={
                                trend.color === "orange" ? "#f97316" : "#10b981"
                              }
                            />
                          );
                        })}
                        {/* X-axis labels */}
                        {trend.dates.map((date, i) => {
                          const x = (i / (trend.dates.length - 1)) * width;
                          return (
                            <text
                              key={i}
                              x={x}
                              y={height - 5}
                              textAnchor="middle"
                              className="text-xs fill-gray-600"
                              fontSize="10"
                            >
                              {date}
                            </text>
                          );
                        })}
                      </svg>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Insights */}
          <div className="mb-6 md:mb-8">
            <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-[#156a9b] mb-4 md:mb-6">
              Insights
            </h3>
            <div className="space-y-3 md:space-y-4">
              {bloodTestReport.insights.map((insight, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 bg-orange-50 border border-orange-200 rounded-lg p-4 md:p-5"
                >
                  <div className="shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 md:h-6 md:w-6 text-orange-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      />
                    </svg>
                  </div>
                  <p className="text-sm md:text-base text-orange-800 flex-1">
                    {insight.message}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Recommendations */}
          <div>
            <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-[#156a9b] mb-4 md:mb-6">
              Recommendations
            </h3>
            <div className="space-y-2 md:space-y-3">
              {bloodTestReport.recommendations.map((recommendation, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 bg-blue-50 border border-blue-200 rounded-lg p-3 md:p-4"
                >
                  <div className="shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 md:h-6 md:w-6 text-blue-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <p className="text-sm md:text-base text-blue-800 flex-1">
                    {recommendation}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HealthOverview;
