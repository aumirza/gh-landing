export const StatCard = ({ title, value, icon }) => {
  return (
    <div className="p-5 transition-all duration-300 bg-gray-100 border rounded-2xl dark:bg-slate-900 hover:shadow-lg hover:-translate-y-1 border-gray-100/10 dark:border-slate-800">
      <div className="flex items-center gap-3">
        <span className="flex items-center justify-center w-12 h-12 text-2xl bg-gray-200 rounded-xl dark:bg-slate-800 dark:text-slate-300">
          {icon}
        </span>
        <div className="flex flex-col">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {title}
          </h3>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
};
