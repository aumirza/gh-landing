const ChevronDownIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    className={className}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m19.5 8.25-7.5 7.5-7.5-7.5"
    />
  </svg>
);

const ChevronUpIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    className={className}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m4.5 15.75 7.5-7.5 7.5 7.5"
    />
  </svg>
);

export const Pagination = ({
  itemsLength,
  pageCount,
  setPageCount,
  itemsPerPage,
}) => {
  return (
    <div className="flex justify-center mt-5">
      {itemsLength > pageCount * itemsPerPage ? (
        <button
          onClick={() => setPageCount((prev) => prev + 1)}
          className="flex items-center gap-2 p-2 px-5 transition-all duration-150 ease-in-out border-2 border-gray-800 rounded-full dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-gray-800 hover:bg-gray-800 hover:text-white"
        >
          Show more
          <ChevronDownIcon className="w-4 h-4" />
        </button>
      ) : (
        itemsLength > itemsPerPage && (
          <button
            onClick={() => setPageCount(1)}
            className="flex items-center gap-2 p-2 px-5 transition-all duration-150 ease-in-out border-2 border-gray-800 rounded-full dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-gray-800 hover:bg-gray-800 hover:text-white"
          >
            Show less
            <ChevronUpIcon className="w-4 h-4" />
          </button>
        )
      )}
    </div>
  );
};
