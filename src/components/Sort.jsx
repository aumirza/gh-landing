const SortIcon = ({ isDesc }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className={`w-5 h-5 transition-transform hover:text-gray-700 dark:hover:text-gray-300 ${
      isDesc ? "" : "rotate-180"
    }`}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 4.5h14.25M3 9h9.75M3 13.5h5.25m5.25-.75L17.25 9m0 0L21 12.75M17.25 9v12"
    />
  </svg>
);

const Sort = ({ sortBy, setSortBy, sortOrder, setSortOrder }) => {
  return (
    <div className="flex items-center gap-3 p-3 transition-all duration-300 bg-gray-100 border rounded-2xl dark:bg-slate-900 dark:border-slate-800">
      <button
        onClick={() => setSortOrder(sortOrder === "desc" ? "asc" : "desc")}
        className="p-1 transition-colors rounded-lg"
        title={sortOrder === "desc" ? "Descending" : "Ascending"}
      >
        <SortIcon isDesc={sortOrder === "desc"} />
      </button>
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="bg-transparent outline-none cursor-pointer dark:bg-slate-900"
      >
        <option value="updated">Last Updated</option>
        <option value="created">Creation Date</option>
      </select>
    </div>
  );
};

export default Sort;
