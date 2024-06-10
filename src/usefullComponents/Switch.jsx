import { memo, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { mode } from "../store/blogReducer";

function Switch() {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  useEffect(
    function () {
      if (open) {
        dispatch(mode("dark"));
        document.documentElement.classList.add("dark");
      } else {
        dispatch(mode("light"));
        document.documentElement.classList.remove("dark");
      }
    },
    [open]
  );

  return (
    <label className="inline-flex items-center  cursor-pointer md:order-0 order-1">
      <input
        type="checkbox"
        value={open}
        checked={open}
        className="sr-only peer tab switch"
        onChange={() => {
          setOpen((c) => !c);
        }}
      />

      <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[url('/sun.svg')] dark:after:content-[url('/moon.svg')] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 after:flex after:items-center after:justify-center"></div>
    </label>
  );
}

export default memo(Switch);
