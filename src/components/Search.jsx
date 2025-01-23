import React, { useEffect, useMemo, useState } from "react";
import Fuse from "fuse.js";

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

export const Search = ({ repos, setFilteredRepos }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const fuse = useMemo(
    () =>
      new Fuse(repos, {
        keys: ["name"],
        includeScore: true,
        threshold: 0.3,
        distance: 5,
      }),
    [repos]
  );

  const queryChangeHandler = (e) => {
    setSearchTerm(e.target.value);
  };

  const clearSearchHandler = () => {
    setSearchTerm("");
  };

  useEffect(() => {
    if (!repos || !repos.length) return;

    if (searchTerm === "") {
      setFilteredRepos(repos);
      return;
    }

    const result = fuse.search(searchTerm);
    const filteredRepos = result.map((result) => result.item);
    // let filteredRepos = repos.filter((repo) =>
    //   repo.name.toLowerCase().includes(searchTerm.toLowerCase())
    // );
    setFilteredRepos(filteredRepos);
  }, [searchTerm, repos, setFilteredRepos, fuse]);

  return (
    <div className="border-b-2 focus-within:border-b-black flex gap-1 pb-2 my-5 transition-all">
      <SearchIcon className="h-6 w-6" />
      <input
        type="text"
        className="outline-none bg-transparent"
        onChange={queryChangeHandler}
        value={searchTerm}
      />

      <button
        className={searchTerm ? "opacity-100" : "opacity-0"}
        onClick={clearSearchHandler}
      >
        <CloseIcon className="h-6 w-6" />
      </button>
    </div>
  );
};
