import Input from "../usefullComponents/Input";
import { FaUserCircle } from "react-icons/fa";
import { FaLock } from "react-icons/fa";

import { useForm } from "react-hook-form";
import FormButton from "../usefullComponents/FormButton";
import { toast } from "react-toastify";
import { login } from "../apis/apis";
import { login as loginAction } from "../store/reducer";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useQueryClient } from "@tanstack/react-query";
import RegisterPage from "./RegisterPage";
import { useEffect } from "react";
const sliderContent = [
  {
    img: "/login1.jpg",
    heading: "New Here?",
    text: " Creating an account is easy and opens up a world of possibilities. Join us today and unlock exclusive features tailored just for you. We can't wait to have you on board!",
  },
  {
    img: "login2.jpg",
    text: "Forgot your password? No worries—we're here to help you reset it quickly. If you encounter any issues, our support team is just a click away and ready to assist you.",
    heading: "Need Help?",
  },
];
function LoginPage() {
  useEffect(function () {
    document.title = `${document.title.split("|")[0]} | Login`;
  }, []);
  return (
    <RegisterPage sliderContent={sliderContent}>
      <LoginForm />
    </RegisterPage>
  );
}

export default LoginPage;

function LoginForm() {
  return (
    <div className="p-10">
      <div className="text-center mb-10">
        <h1 className=" text-2xl text-gray-900 dark:text-zinc-200 font-semiblod mb-1">
          Login Account
        </h1>
        <p className="mx-auto text-sm text-zinc-500 max-w-96">
          We're thrilled to see you again! Logging in gives you access to all
          your personalized content and features. Let's continue where you left
          off and make the most of your day!
        </p>
      </div>
      <Form />
      <div className="text-center">
        <div className="inline-flex relative items-center justify-center w-full">
          <hr className="w-1/2 h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
          <span className="absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left-1/2 dark:text-white dark:bg-gray-900">
            or
          </span>
        </div>
        <GoogleButton />
        <div className="mt-3">
          <div className="flex gap-2 items-center justify-center text-sm">
            <p className="text-zinc-500">Don't have account?</p>

            <Link
              to="/signup"
              className="font-light text-blue-600 dark:text-blue-500 hover:underline"
            >
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function GoogleButton() {
  return (
    <button
      type="button"
      className="text-black border text-sm px-10 py-2.5 text-center inline-flex items-center  me-2 mb-2 hover:text-white  hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg  dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
    >
      <img src="/google.svg" className=" w-4 h-4 me-2" alt="google icon" />
      Sign in with Google
    </button>
  );
}

function Form() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm();
  const queryClient = useQueryClient();
  async function submit(data) {
    try {
      const response = await login(data);
      if (response.status === "success") {
        if (response.data.user.isVerified === false) {
          return toast.error("Email not verified");
        }
        toast.success("Your login Successfully!");
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("token", JSON.stringify(response.data.token));
        dispatch(loginAction(response.data.user));
        queryClient.invalidateQueries();
        queryClient.clear();
        setTimeout(() => {
          navigate("/");
        }, 2000);
        setInterval(function () {
          localStorage.clear();
          dispatch(loginAction({}));
        }, Date.now() + 60 * 24 * 60 * 60 * 1000);
      } else if (response.status === "Fail") {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Check the Internet Connection");
    }
  }

  return (
    <form onSubmit={handleSubmit(submit)}>
      <Input
        icon={<FaUserCircle />}
        type="email"
        label="Email"
        placeholder="Enter your Email"
        register={register}
        validation={{ required: "Email field required" }}
        error={errors.Email}
      />
      <Input
        icon={<FaLock />}
        type="password"
        label="Password"
        placeholder="*************"
        className="mt-2"
        register={register}
        validation={{
          required: "Password field required",
          minLength: {
            value: 8,
            message: "Password must be at least 8 characters long",
          },
          validate: {
            hasUpperCase: (value) =>
              /[A-Z]/.test(value) ||
              "Password must have at least one uppercase letter",
            hasLowerCase: (value) =>
              /[a-z]/.test(value) ||
              "Password must have at least one lowercase letter",
            hasNumber: (value) =>
              /\d/.test(value) || "Password must have at least one number",
            hasSpecialChar: (value) =>
              /[@$!%*?&]/.test(value) ||
              "Password must have at least one special character",
          },
        }}
        error={errors.Password}
      />
      <div className="flex justify-end">
        <Link
          to="/forgetpassword"
          className="font-light text-sm mt-5 text-blue-600 dark:text-blue-500 hover:underline"
        >
          Forget Password?
        </Link>
      </div>
      <FormButton
        label={isSubmitting ? "Loading..." : "Login"}
        disable={isSubmitting}
      />
    </form>
  );
}
