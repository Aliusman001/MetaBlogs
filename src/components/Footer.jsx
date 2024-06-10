import { memo } from "react";
import { FaEnvelope } from "react-icons/fa";

function Footer() {
  return (
    <div className="bg-gray-100 dark:bg-gray-900 py-20 mt-5">
      <div className="max-w-screen-xl mx-auto grid md:grid-cols-[2fr,1fr,1fr,2fr] items-start text-[var(--footer)] sm:grid-cols-[2fr,1fr,1fr] gap-y-10  grid-cols-[1fr] justify-items-center">
        <div className="flex flex-col justify-between gap-5 ml-0 sm:ml-3 sm:text-left text-center">
          <div>
            <h3 className="mb-4 font-bold text-gray-900 dark:text-white">
              About
            </h3>
            <p className=" max-w-72">
              At Meta Blog, we believe in the power of knowledge and the impact
              of sharing ideas. Join us at Meta Blog and embark on a journey of
              discovery and learning.
            </p>
          </div>
          <div className="sm:block hidden">
            <div className="flex gap-1 sm:justify-start justify-center">
              <h4 className="text-gray-900 font-bold dark:text-white">
                Email:
              </h4>
              <p> au08854@gmail.com</p>
            </div>
            <div className="flex gap-1 sm:justify-start justify-center">
              <h4 className="text-gray-900 font-bold dark:text-white">
                Phone:
              </h4>
              <p> +92-834627547</p>
            </div>
          </div>
        </div>

        <div className="text-center sm:text-left">
          <h3 className="font-bold mb-4 text-gray-900 dark:text-white">
            Quick Link
          </h3>
          <ul className="flex flex-col gap-2">
            <li>
              <a href="">Home</a>
            </li>
            <li>
              <a href="">Post</a>
            </li>
            <li>
              <a href="">Blog</a>
            </li>
            <li>
              <a href="">Auther</a>
            </li>
            <li>
              <a href="">Contact</a>
            </li>
          </ul>
        </div>

        <div className="text-center sm:text-left">
          <h3 className="font-bold text-gray-900 mb-4 dark:text-white">
            Category
          </h3>
          <ul className="flex flex-col gap-2">
            <li>
              <a href="">Home</a>
            </li>
            <li>
              <a href="">Post</a>
            </li>
            <li>
              <a href="">Blog</a>
            </li>
            <li>
              <a href="">Auther</a>
            </li>
            <li>
              <a href="">Contact</a>
            </li>
          </ul>
        </div>

        <Newsletter />
      </div>
    </div>
  );
}

export default memo(Footer);

function Newsletter() {
  return (
    <>
      <div className="bg-white dark:bg-[#242535] md:col-start-4 md:col-end-5 sm:col-span-4 rounded-md text-center px-10 py-5 md:w-full">
        <h3 className="text-[20px] font-semibold mb-1 dark:text-white text-gray-900 ">
          Weekly Newsletter
        </h3>
        <p className="mb-8 text-sm">Get blog articles and offers via email</p>
        <Input />
        <button className="w-full bg-blue-700 text-white p-3 mt-3 rounded-md hover:bg-blue-800 transition-all mb-5 focus:outline-none focus:ring-4 focus:ring-blue-600">
          Subscribe
        </button>
      </div>
      <div className="block sm:hidden">
        <div className="flex gap-1 sm:justify-start justify-center">
          <h4 className="text-gray-900 font-bold dark:text-white">Email:</h4>
          <p> au08854@gmail.com</p>
        </div>
        <div className="flex gap-1 sm:justify-start justify-center">
          <h4 className="text-gray-900 font-bold dark:text-white">Phone:</h4>
          <p> +92-834627547</p>
        </div>
      </div>
    </>
  );
}

function Input() {
  return (
    <div className={`relative`}>
      <div className="absolute right-5 top-1/2 -translate-y-1/2  ">
        <FaEnvelope />
      </div>
      <input
        onClick={(e) => {
          e.stopPropagation();
        }}
        type="text"
        id="search-navbar"
        className="block tab focus:right-4  h-10 w-full p-2 ps-4 pe-12 text-sm text-gray-900 border border-gray-300 rounded-md bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Your Email"
      />
    </div>
  );
}
