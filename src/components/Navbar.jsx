import { memo, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/reducer";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchSearch } from "../apis/apis";
import RegisteredBtn from "../usefullComponents/RegisteredBtn";
import Logo from "../usefullComponents/Logo";
import Switch from "../usefullComponents/Switch";
import BurgerBtn from "../usefullComponents/BurgerBtn";
import NavLinks from "../usefullComponents/NavLinks";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

function Navbar() {
  const [show, setShow] = useState(false);
  const [searchModel, setSearchModel] = useState(false);
  const user = useSelector((store) => store.account.user);
  const dispatch = useDispatch();
  const burger = useRef(null);

  useEffect(function () {
    const user = JSON.parse(localStorage.getItem("user"));
    dispatch(login(user));
  }, []);

  function handleNavbar(e) {
    if (!burger.current?.contains(e.target)) {
      setShow(false);
    }
  }
  useEffect(() => {
    document.addEventListener("click", handleNavbar);
    return () => {
      document.removeEventListener("click", handleNavbar);
    };
  }, []);

  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-gray-800 max-w-screen-xl mx-auto">
        <div className="flex flex-wrap items-center justify-between mx-auto p-4">
          <a
            href="/"
            className="flex  items-center space-x-3 rtl:space-x-reverse"
          >
            <Logo />
            <span className="self-center text-lg font-thin whitespace-nowrap dark:text-white">
              Meta<span className="font-bold">Blog</span>
            </span>
          </a>
          <div className="flex md:order-2 md:gap-3 gap-2  items-center ">
            <Switch />
            <SearchIcon setSearchModel={setSearchModel} />

            <div className="relative  hidden md:block md:order-1 order-0">
              <Search />
            </div>
            {user?.username ? (
              <Profile author={user} />
            ) : (
              <>
                <RegisteredBtn
                  link={"/login"}
                  label={"Login"}
                  className="hidden md:block"
                />
                <RegisteredBtn
                  link={"/signup"}
                  label={"Sign up"}
                  className="hidden md:block"
                />
              </>
            )}

            <BurgerBtn setShow={setShow} />
          </div>
          <NavLinks show={show} refs={burger} />
        </div>
      </nav>
      {searchModel && (
        <div
          onClick={() => {
            const focusableElements = document.querySelectorAll(
              "a, button, textarea, .tab, select, details"
            );
            focusableElements.forEach((element) => {
              element.setAttribute("tabIndex", "1");
            });
            setSearchModel(false);
          }}
          style={{ backgroundColor: "rgba(0, 0, 0, 0.950)" }}
          className="md:hidden z-50 search_model fixed w-full top-0 h-full flex justify-center"
        >
          <Search searchModel={searchModel} />
        </div>
      )}
    </>
  );
}
export default Navbar;

const Search = memo(function Search({ searchModel }) {
  const [query, setQuery] = useState("");

  const search = useRef(null);
  const { data, isLoading, error } = useQuery({
    queryKey: ["search", query],
    queryFn: fetchSearch,
    enabled: query.length > 3 ? true : false,
  });

  useEffect(() => {
    if (searchModel) {
      const focusableElements = document.querySelectorAll(
        "a, button, textarea, .tab, select, details"
      );
      focusableElements.forEach((element) => {
        element.setAttribute("tabIndex", "-1");
      });
    }
  }, [searchModel]);

  return (
    <div className="relative" ref={search}>
      <div className={`relative ${searchModel ? "top-24  w-80" : ""}`}>
        <div className="absolute right-5 top-3">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            xmlnsname="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          onChange={(e) => {
            setQuery(e.target.value);
          }}
          onClick={(e) => {
            e.stopPropagation();
          }}
          type="text"
          autoFocus
          tabIndex={1}
          id="search-navbar"
          className="block w-full p-2 ps-4 pe-12 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search"
        />
      </div>
      {data?.data.blogs.length > 0 && (
        <div
          id="userDropdown"
          className={`z-10 bg-white w-full rounded-lg shadow  dark:bg-gray-700 absolute  md:top-12 dark:divide-gray-600 top-40`}
        >
          <ul
            className="py-2  divide-y divide-gray-100 text-sm text-gray-700 dark:text-gray-200"
            aria-labelledby="avatarButton"
          >
            {data?.data.blogs.map((v, i) => {
              return (
                <li key={i}>
                  <a
                    title={v.title}
                    href={`/blog/${v._id}`}
                    className="block  truncate px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    {v.title}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
});
function Profile({ author }) {
  const [profile, setProfile] = useState(false);
  const host = useSelector((store) => store.account.host);
  const dispatch = useDispatch();
  const userDrop = useRef(null);
  const queryClient = useQueryClient();

  function handleUserDrop(e) {
    if (!userDrop.current?.contains(e.target)) {
      setProfile(false);
    }
  }
  useEffect(function () {
    document.addEventListener("click", handleUserDrop);
    return () => {
      document.removeEventListener("click", handleUserDrop);
    };
  }, []);

  return (
    <div className="relative order-4" ref={userDrop}>
      <img
        id="avatarButton"
        type="button"
        className="w-10 h-10 rounded-full cursor-pointer border object-cover"
        src={
          author.photo ? `${host}/images/user/${author.photo}` : "/profile.svg"
        }
        alt="User dropdown"
        onClick={() => {
          setProfile((c) => !c);
        }}
      />
      <div
        id="userDropdown"
        className={`${
          !profile ? "hidden" : ""
        } z-10  bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 absolute -left-32 top-12 dark:divide-gray-600`}
      >
        <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
          <div>{author.username}</div>
          <div className="font-medium truncate">{author.email}</div>
        </div>

        <ul
          className="py-2 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="avatarButton"
        >
          {(author.role === "admin"
            ? [
                { path: "/setting", link: "Setting" },
                { path: "/dashbord", link: "Dashbord" },
              ]
            : [{ path: "/setting", link: "Setting" }]
          ).map((v, i) => {
            return (
              <li key={i}>
                <Link
                  to={v.path}
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  {v.link}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="py-1 ">
          <a
            onClick={() => {
              queryClient.invalidateQueries();
              queryClient.clear();
              localStorage.removeItem("user");
              localStorage.removeItem("token");
              dispatch(login({}));
            }}
            className="block cursor-pointer select-none px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
          >
            Sign out
          </a>
        </div>
      </div>
    </div>
  );
}
const SearchIcon = memo(function SearchIcon({ setSearchModel }) {
  return (
    <button
      onClick={() => {
        setSearchModel((c) => !c);
      }}
      type="button"
      className="md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 me-1"
    >
      <FaSearch size={17} />
    </button>
  );
});
