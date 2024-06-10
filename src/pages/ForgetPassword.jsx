import { useEffect } from "react";
import RegisterPage from "./RegisterPage";
import Input from "../usefullComponents/Input";
import { FaUserCircle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import FormButton from "../usefullComponents/FormButton";
import { Link } from "react-router-dom";
import { forgetPassword } from "../apis/apis";
import { toast } from "react-toastify";
import { useState } from "react";
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
function ForgetPassword() {
  useEffect(function () {
    document.title = `${document.title.split("|")[0]} | Forget Password`;
  }, []);
  return (
    <RegisterPage sliderContent={sliderContent}>
      <ForgetPasswordForm />
    </RegisterPage>
  );
}

export default ForgetPassword;

function ForgetPasswordForm() {
  return (
    <div className="p-10">
      <div className="text-center mb-10">
        <h1 className=" text-2xl text-gray-900 dark:text-zinc-200 font-semiblod mb-1">
          Forget your password
        </h1>
        <p className="mx-auto text-sm text-zinc-500 max-w-96">
          Please enter the email address you'd like your reset the password of
          MetaBlogs Account.
        </p>
      </div>
      <Form />
    </div>
  );
}

function Form() {
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm();
  async function submit(data) {
    try {
      const response = await forgetPassword(data);
      if (response.status === "Fail") {
        if (!(response.message === "user not found at that email")) {
          toast.error(response.message);
          return setError(response);
        }
        toast.error("We can't find your email");
        setError({ message: "We can't find your email" });
      } else {
        toast.success("Email send Successfully");
        setError({ message: "" });
        console.log(response);
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
        placeholder="Enter email address"
        register={register}
        validation={{
          required: "Email field required",
        }}
        error={errors.Email || error}
      />
      <FormButton
        label={isSubmitting ? "Loading..." : "Request rest link"}
        disable={isSubmitting}
      />
      <div className="mt-5 text-center">
        <Link
          to="/login"
          className="font-light text-sm text-blue-600 dark:text-blue-500 hover:underline"
        >
          Back To Login
        </Link>
      </div>
    </form>
  );
}
