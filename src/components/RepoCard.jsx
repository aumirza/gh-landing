import { useMemo } from "react";
import {
  FaCode,
  FaGithub,
  FaStar,
  FaCodeBranch,
  FaEye,
  FaBalanceScale,
} from "react-icons/fa";
import RepoImage from "./RepoImage";

export const RepoCard = ({ repo }) => {
  const createdDate = useMemo(
    () => new Date(repo.created_at),
    [repo.created_at]
  );
  const updatedDate = useMemo(
    () => new Date(repo.updated_at),
    [repo.updated_at]
  );

  return (
    <div className="flex flex-col w-full gap-4 p-5 transition-all duration-300 bg-gray-200 border rounded-2xl dark:bg-slate-900 hover:shadow-lg hover:-translate-y-1 border-gray-100/10 dark:border-slate-800">
      <div className="relative overflow-hidden rounded-xl aspect-video">
        <RepoImage repo={repo} />
        <div className="absolute flex gap-2 top-2 right-2">
          <a
            href={repo.html_url}
            className="p-2 text-gray-700 rounded-full bg-gray-200/90 hover:bg-gray-100 dark:bg-slate-800/90 dark:text-gray-300 dark:hover:bg-slate-700"
            title="View on GitHub"
          >
            <FaGithub className="w-5 h-5" />
          </a>
          {repo.homepage && (
            <a
              href={repo.homepage}
              className="p-2 text-gray-700 rounded-full bg-gray-200/90 hover:bg-gray-100 dark:bg-slate-800/90 dark:text-gray-300 dark:hover:bg-slate-700"
              title="Live Preview"
            >
              <FaEye className="w-5 h-5" />
            </a>
          )}
          {repo.archived && (
            <span className="px-2 py-1 text-xs font-medium text-yellow-800 bg-yellow-200 rounded-full">
              Archived
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="text-xl font-semibold text-gray-900 break-words dark:text-white">
          {repo.name}
        </h3>

        <p className="text-sm text-gray-600 dark:text-gray-300">
          {repo.description || "No description provided"}
        </p>

        <div className="grid grid-cols-3 gap-2 p-2 text-sm bg-gray-300 rounded-xl dark:bg-slate-800">
          <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
            <FaStar className="w-4 h-4" />
            <span>{repo.stargazers_count}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
            <FaCodeBranch className="w-4 h-4" />
            <span>{repo.forks_count}</span>
          </div>
          <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
            <FaEye className="w-4 h-4" />
            <span>{repo.watchers_count}</span>
          </div>
        </div>

        <div className="flex flex-col gap-2 pt-3 border-t border-gray-100 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {repo.language && (
                <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                  <FaCode className="w-4 h-4" />
                  <span>{repo.language}</span>
                </div>
              )}
              {repo.license && (
                <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                  <FaBalanceScale className="w-4 h-4" />
                  <span className="hidden sm:inline">{repo.license.name}</span>
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
            <span>Created: {createdDate.toLocaleDateString()}</span>
            <span>Updated: {updatedDate.toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
