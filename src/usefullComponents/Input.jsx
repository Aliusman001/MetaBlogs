import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

function Input({
  error,
  label = "username",
  placeholder = "aliusman@gmail.com",
  type = "text",
  icon,
  className = "",
  register,
  validation = {},
}) {
  const [show, setShow] = useState(false);
  return (
    <div className={className}>
      <label
        htmlFor={label}
        className={`block mb-2 text-sm font-medium text-gray-900 dark:text-white ${
          error?.message ? "font-medium text-red-700 dark:text-red-500" : ""
        }`}
      >
        {label}
      </label>
      <div className="flex">
        <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border border-e-0 border-gray-300 rounded-s-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
          {icon}
        </span>
        <div className="relative w-full">
          <input
            type={type === "password" ? (show ? "text" : "password") : type}
            id={label}
            className={`rounded-none rounded-e-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
              error?.message
                ? "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500  dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"
                : ""
            }`}
            placeholder={placeholder}
            {...register(label, validation)}
          />
          {type === "password" && (
            <span className=" absolute right-5 top-1/2 -translate-y-1/2">
              {show ? (
                <FaEyeSlash
                  onClick={() => {
                    setShow((c) => !c);
                  }}
                  className="dark:fill-white  fill-gray-700"
                />
              ) : (
                <FaEye
                  className="dark:fill-white  fill-gray-700"
                  onClick={() => {
                    setShow((c) => !c);
                  }}
                />
              )}
            </span>
          )}
        </div>
      </div>

      {error?.message && (
        <p className="mt-2 text-sm text-red-600 dark:text-red-500">
          {error?.message}
        </p>
      )}
    </div>
  );
}

export default Input;
