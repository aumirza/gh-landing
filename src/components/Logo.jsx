import { FaGithub } from "react-icons/fa";
import { username } from "../constants";

export const Logo = () => {
  return (
    <div className="flex items-center">
      <FaGithub className="text-2xl" />
      <span className="ml-2 font-mono text-lg font-bold md:text-2xl">
        {
          // first letter capital
          username.charAt(0).toUpperCase() + username.slice(1)
        }
        's DevGallery
      </span>
    </div>
  );
};
