import Slider from "../usefullComponents/Slider";
import FormButton from "../usefullComponents/FormButton";
import Input from "../usefullComponents/Input";
import { FaLock, FaUserCircle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { signup } from "../apis/apis";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import RegisterPage from "./RegisterPage";
import { useEffect } from "react";
const sliderContent = [
  {
    img: "/login1.jpg",
    heading: "Quick and Easy Signup",
    text: "Creating an account is simple and takes just a few minutes. Fill in the required information, and you'll be ready to go. We value your privacy and ensure your data is secure with us.",
  },
  {
    img: "login2.jpg",
    text: "If you have any questions or run into issues during the signup process, our support team is here to help. Feel free to reach out, and we'll guide you through every step. Let's get you started on this exciting journey!",
    heading: "Need Assistance?",
  },
];
function SignupPage() {
  useEffect(function () {
    document.title = `${document.title.split("|")[0]} | Signup`;
  }, []);
  return (
    <RegisterPage sliderContent={sliderContent}>
      <SignUp />
    </RegisterPage>
  );
}

export default SignupPage;

function SignUp() {
  return (
    <div className="p-10 dark:bg-gray-800">
      <div className="text-center mb-10">
        <h1 className=" text-2xl text-gray-900 dark:text-zinc-200 font-semiblod mb-1">
          Signup Account
        </h1>
        <p className="mx-auto text-sm text-zinc-500 max-w-96">
          Welcome! By creating an account, you'll gain access to personalized
          content, exclusive features, and a supportive community. Start your
          journey with us today and explore all we have to offer.
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
        <div className="mt-3">
          <div className="flex gap-2 items-center justify-center text-sm">
            <p className="text-zinc-500">Already have account?</p>

            <Link
              to="/login"
              className="font-light text-blue-600 dark:text-blue-500 hover:underline"
            >
              Sign-up Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
function Form() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    watch,
  } = useForm();
  const queryClient = useQueryClient();

  async function Submit(data) {
    try {
      const response = await signup(data);
      if (response.status === "success") {
        toast.success(response.data.message);
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
      } else if (response.status === "Fail" || response.status === "Error") {
        toast.error(response.message);
      }
    } catch (error) {
      console.log(error.message);
      toast.error("Check the Internet Connection");
    }
  }

  const password = watch("Password");

  return (
    <form onSubmit={handleSubmit(Submit)}>
      <Input
        icon={<FaUserCircle />}
        type="text"
        label="Username"
        placeholder="Enter your Email"
        register={register}
        validation={{ required: "Username field required" }}
        error={errors.Username}
      />
      <Input
        icon={<FaUserCircle />}
        type="email"
        label="Email"
        placeholder="Enter your Email"
        register={register}
        validation={{ required: "Email field required" }}
        error={errors.Email}
        className="mt-2"
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
      <Input
        icon={<FaLock />}
        type="password"
        label="Confirm Password"
        placeholder="*************"
        className="mt-2"
        register={register}
        validation={{
          required: "Confirm Password field required",
          validate: (value) => {
            return (
              value === password || "Confirm Password not equals to password"
            );
          },
        }}
        error={errors["Confirm Password"]}
      />

      <FormButton
        label={isSubmitting ? "Loading..." : "Signup"}
        disable={isSubmitting}
      />
    </form>
  );
}
