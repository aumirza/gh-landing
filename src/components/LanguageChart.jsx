import { languageColors } from "../utils/languageColors";

const CircularProgress = ({ percentage, color }) => (
  <div className="relative w-20 h-20">
    <svg className="w-full h-full" viewBox="0 0 36 36">
      <path
        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
        fill="none"
        stroke="#e6e6e6"
        strokeWidth="3"
        className="dark:stroke-slate-800"
      />
      <path
        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
        fill="none"
        stroke={color}
        strokeWidth="3"
        strokeDasharray={`${percentage}, 100`}
      />
    </svg>
    <div className="absolute inset-0 flex items-center justify-center text-sm font-medium text-gray-700 dark:text-gray-300">
      {percentage}%
    </div>
  </div>
);

const LanguageChart = ({ languages }) => {
  const topLanguages = Object.entries(languages)
    .sort(([, a], [, b]) => b.count - a.count)
    .slice(0, 6)
    .map(([lang, data]) => ({
      name: lang,
      percentage: data.percentage,
      count: data.count,
      color: languageColors[lang] || languageColors.default,
    }));

  return (
    <div className="w-full p-5 transition-all duration-300 bg-gray-100 border rounded-2xl dark:bg-slate-900 hover:shadow-lg border-gray-100/10 dark:border-slate-800">
      <h3 className="mb-6 text-xl font-semibold text-gray-900 dark:text-white">
        Most Used Languages
      </h3>
      <div className="flex flex-wrap items-center justify-center gap-6">
        {topLanguages.map(({ name, percentage, color, count }) => (
          <div key={name} className="flex flex-col items-center space-y-2">
            <CircularProgress percentage={percentage} color={color} />
            <div className="flex items-center gap-2">
              <span
                className="inline-block w-3 h-3 rounded-full"
                style={{ backgroundColor: color }}
              />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {name}
              </span>
            </div>
            <span className="text-xs text-gray-600 dark:text-gray-400">
              ({count})
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LanguageChart;
