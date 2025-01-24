import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { useScrollDirection } from "../hooks/useScrollDirection";

export const Header = () => {
  const scrollDirection = useScrollDirection();

  return (
    <div
      className={`fixed z-10 w-full shadow-md bg-gradient-to-r from-white to-gray-100 dark:from-slate-800 dark:to-slate-900 transition-transform duration-300 ${
        scrollDirection === "down" ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="flex items-center justify-between w-11/12 py-4 mx-auto">
        <Logo />
        <ThemeToggle />
      </div>
    </div>
  );
};
