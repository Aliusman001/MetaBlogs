import { memo } from "react";
import { NavLink } from "react-router-dom";
import RegisteredBtn from "./RegisteredBtn";
import { useSelector } from "react-redux";

function NavLinks({ show, refs }) {
  const user = useSelector((store) => store.account.user);
  return (
    <div
      ref={refs}
      className={`${
        show ? "" : "hidden"
      } items-center justify-center w-full md:flex md:w-auto md:order-1`}
      id="navbar-search"
    >
      <ul className="flex  flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg  md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-8 md:dark:bg-gray-800 dark:border-gray-700">
        {[
          { path: "/", link: "Home" },
          { path: "/blogs", link: "Blogs" },
          { path: "/contact", link: "Contact" },
        ].map((v, i) => {
          return (
            <li key={i}>
              <NavLink
                to={v.path}
                className="block  py-2 px-3 text-base font-sans text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                {v.link}
              </NavLink>
            </li>
          );
        })}
        {!user?.username && (
          <li className="md:hidden flex gap-2 mt-3 justify-center items-center">
            <RegisteredBtn label="Login" link="/login" />
            <RegisteredBtn label="Sign-up" link="/signup" />
          </li>
        )}
      </ul>
    </div>
  );
}

export default memo(NavLinks);
