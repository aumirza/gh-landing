import React, { useEffect, useMemo, useState } from "react";
import Fuse from "fuse.js";
import { sortRepos } from "../utils/sortRepos";

const SearchIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className={className}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
    />
  </svg>
);

const CloseIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    className={className}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6 18 18 6M6 6l12 12"
    />
  </svg>
);

export const Search = ({ repos, setFilteredRepos, sortBy, sortOrder }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState(repos); // Store search results separately
  const [isFocused, setIsFocused] = useState(false);

  const fuse = useMemo(
    () =>
      new Fuse(repos, {
        keys: [
          { name: "name", weight: 1 },
          { name: "description", weight: 0.5 },
          { name: "language", weight: 0.3 },
          { name: "topics", weight: 0.3 },
        ],
        includeScore: true,
        threshold: 0.4,
        distance: 100,
        minMatchCharLength: 2,
      }),
    [repos]
  );

  const queryChangeHandler = (e) => {
    setSearchTerm(e.target.value);
  };

  // Separate effect for search
  useEffect(() => {
    if (!repos?.length) return;

    const trimmedSearch = searchTerm.trim();

    if (trimmedSearch === "") {
      setSearchResults(repos);
      return;
    }

    if (trimmedSearch.length === 1) {
      const singleCharResults = repos.filter((repo) =>
        repo.name.toLowerCase().startsWith(trimmedSearch.toLowerCase())
      );
      setSearchResults(singleCharResults);
      return;
    }

    const result = fuse.search(searchTerm);
    const filtered = result
      .filter((result) => result.score < 0.6)
      .map((result) => result.item);
    setSearchResults(filtered);
  }, [searchTerm, repos, fuse]);

  // Separate effect for sorting
  useEffect(() => {
    setFilteredRepos(sortRepos(searchResults, sortBy, sortOrder));
  }, [searchResults, sortBy, sortOrder, setFilteredRepos]);

  return (
    <div className="flex flex-col justify-center w-full max-w-2xl mx-auto">
      <div
        className={`
        flex items-center gap-3 p-4 transition-all duration-300
        bg-gray-100 dark:bg-slate-900 border border-gray-200 dark:border-slate-800
        rounded-2xl ${
          isFocused ? "shadow-lg ring-2 ring-gray-400 dark:ring-gray-600" : ""
        }
      `}
      >
        <SearchIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        <input
          type="text"
          className="w-full text-gray-900 bg-transparent outline-none dark:text-white placeholder:text-gray-500"
          placeholder="Search repositories..."
          onChange={queryChangeHandler}
          value={searchTerm}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {searchTerm && (
          <button
            className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            onClick={() => setSearchTerm("")}
          >
            <CloseIcon className="w-5 h-5" />
          </button>
        )}
      </div>
    </div>
  );
};
