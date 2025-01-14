import { memo } from "react";

function BurgerBtn({ setShow }) {
  return (
    <button
      onClick={(e) => {
        setShow((c) => !c);
        e.stopPropagation();
      }}
      data-collapse-toggle="navbar-search"
      type="button"
      className="inline-flex items-center order-10 p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
    >
      <svg className="w-5 h-5" fill="none" viewBox="0 0 17 14">
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M1 1h15M1 7h15M1 13h15"
        />
      </svg>
    </button>
  );
}

export default memo(BurgerBtn);
