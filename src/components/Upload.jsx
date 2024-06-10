import { useRef } from "react";
import { useForm } from "react-hook-form";
import { updateProfile } from "../apis/apis";
import { useDispatch, useSelector } from "react-redux";
import { login as loginAction } from "../store/reducer";
import { FaPlus } from "react-icons/fa";

function Upload() {
  const host = useSelector((store) => store.account.host);
  const user = useSelector((store) => store.account.user);
  const fileRef = useRef(null);
  const dispatch = useDispatch();
  const {
    formState: { isSubmitting, error },
    handleSubmit,
    setValue,
  } = useForm();
  async function submit(data) {
    try {
      const response = await updateProfile(data);
      if (response.status === "success") {
        localStorage.setItem("user", JSON.stringify(response.data.user));
        dispatch(loginAction(response.data.user));
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="flex items-center justify-center mb-5 mt-10"
    >
      {error && <p>{error}</p>}
      <input
        type="file"
        className="hidden"
        ref={fileRef}
        accept="image/*"
        onChange={(e) => {
          const file = e.target.files[0];
          if (file) {
            setValue("photo", e.target.files);
            handleSubmit(submit)(); // Trigger form submission
          }
        }}
      />
      <div className="relative">
        <img
          className="w-52 shadow-black shadow-sm h-52 border border-gray-400 dark:border-white rounded-full"
          src={
            user.photo ? `${host}/images/user/${user.photo}` : "/profile.svg"
          }
          alt="Extra large avatar"
          onClick={() => {
            fileRef.current.click();
          }}
        />
        <button
          onClick={() => {
            fileRef.current.click();
          }}
          className="absolute cursor-pointer transition-all hover:bg-gray-600 -right-2 bottom-10 w-10 h-10 bg-gray-500 rounded-full flex items-center justify-center"
        >
          <FaPlus size={15} className="fill-white" />
        </button>
      </div>
    </form>
  );
}

export default Upload;
