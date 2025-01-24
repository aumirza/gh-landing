import React from "react";
import { FaGithub } from "react-icons/fa";

export const Footer = () => {
  return (
    <div className="flex flex-col items-center gap-3 py-8 shadow-inner bg-gradient-to-r from-gray-50 to-gray-100 dark:from-slate-900 dark:to-slate-800">
      <p className="text-sm text-gray-600 dark:text-gray-400">
        &copy; {new Date().getFullYear()}. All rights reserved.
      </p>

      <div className="fixed flex flex-row-reverse w-full gap-3 group right-10 bottom-10 md:right-14 md:bottom-14">
        <a
          href="https://github.com/aumirza/gh-landing"
          target="_blank"
          rel="noreferrer"
          className="transition-transform peer hover:scale-110"
        >
          <FaGithub className="text-4xl text-gray-700 transition-colors md:text-5xl dark:text-gray-300 hover:text-black dark:hover:text-white" />
        </a>
        <span className="hidden p-3 transition-all transform bg-white rounded-lg shadow-lg dark:bg-slate-700 peer-hover:block">
          Like this? Make yours too!
        </span>
      </div>

      <div className="text-gray-600 dark:text-gray-400">
        <span>Made with </span>
        <span className="inline-block animate-pulse">❤️</span>
        <span> by </span>
        <a
          href="https://gh.ahmadullah.in"
          className="text-blue-500 underline transition-colors hover:text-blue-700 dark:hover:text-blue-400"
        >
          @aumirza
        </a>
      </div>
    </div>
  );
};
