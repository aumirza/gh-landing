import React from "react";
import { FaGithub } from "react-icons/fa";

export const Footer = () => {
  return (
    <div className="py-5 flex flex-col gap-2 items-center">
      <p className=" text-gray-500 text-xs">
        &copy; {new Date().getFullYear()}. All rights reserved.
      </p>

      <div className="group fixed w-full right-10 bottom-10 md:right-14 md:bottom-14 flex flex-row-reverse gap-2">
        <a
          href="https://github.com/aumirza/gh-landing"
          target="_blank"
          rel="noreferrer"
          className="peer"
        >
          <FaGithub className="text-4xl md:text-5xl dark:text-white  text-gray-600 hover:text-black" />
        </a>
        <span className="bg-slate-300 dark:bg-slate-700 p-2 rounded-md border-2 hidden peer-hover:block">
          Like this ?? make yours too..
        </span>
      </div>

      <div className="">
        <span> made with ❤️ by </span>
        <a href="https://gh.ahmadullah.in" className="text-blue-500 underline">
          @aumirza
        </a>
      </div>
    </div>
  );
};
