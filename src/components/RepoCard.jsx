import { useMemo } from "react";
import { FaCode, FaGithub, FaLink } from "react-icons/fa";
import RepoImage from "./RepoImage";

export const RepoCard = ({ repo }) => {
  const date = useMemo(() => new Date(repo.created_at), [repo.created_at]);

  return (
    <div className="relative flex flex-col gap-5 p-5 text-gray-800 transition-all duration-100 ease-in-out bg-gray-200 shadow w-80 rounded-3xl hover:shadow-xl dark:bg-gray-300 hover:-translate-y-1">
      <div className="rounded-md shadow overflow-clip">
        <RepoImage repo={repo} />
      </div>
      <div className="flex flex-col justify-center flex-grow gap-2 p-2 pt-1">
        <div className="mb-1 text-xl font-medium text-center md:text-2xl">
          {repo.name}
        </div>
        <div className="flex flex-col flex-grow gap-1">
          <div className="text-sm">{repo.description}</div>
          <div className="text-sm italic font-semibold text-center">
            {`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`}
          </div>
          {/* <div className="flex items-center justify-between">
            <div className="flex items-center my-1">
              <img
                className="w-5 h-5 mr-1 rounded-full"
                src={repo.owner.avatar_url}
                alt="avatar"
              />
              <a
                className="underline"
                href={repo.owner.html_url}
                target="_blank"
                rel="noreferrer"
              >
                {repo.owner.login}
              </a>
            </div>
          </div> */}
          {repo.language ? (
            <div className="flex items-center justify-center">
              <FaCode className="mr-2 text-sm" />
              <div className="text-sm text-center">{repo.language}</div>
            </div>
          ) : null}
        </div>
        <div className="flex justify-between w-full">
          <a className="underline" href={repo.html_url}>
            <FaGithub className="text-3xl duration-150 hover:scale-125" />
          </a>
          {repo.homepage ? (
            <a className="underline" href={repo.homepage}>
              <FaLink className="text-2xl duration-150 hover:scale-125" />
            </a>
          ) : null}
        </div>
      </div>
    </div>
  );
};
