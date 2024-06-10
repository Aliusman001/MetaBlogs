import { useNavigate } from "react-router-dom";

function RegisteredBtn({ className, link, label }) {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => {
        navigate(link);
      }}
      type="button"
      className={`${
        className ? className : ""
      } text-white  md:order-3  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5   dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800`}
    >
      {label}
    </button>
  );
}

export default RegisteredBtn;
