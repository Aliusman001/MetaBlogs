import React from "react";
import RegisterPage from "./RegisterPage";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import FormButton from "../usefullComponents/FormButton";
import { FaLock } from "react-icons/fa";
import Input from "../usefullComponents/Input";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { resetPassword } from "../apis/apis";

const sliderContent = [
  {
    img: "/login1.jpg",
    heading: "New Here?",
    text: " Creating an account is easy and opens up a world of possibilities. Join us today and unlock exclusive features tailored just for you. We can't wait to have you on board!",
  },
  {
    img: "/login2.jpg",
    text: "Forgot your password? No worries—we're here to help you reset it quickly. If you encounter any issues, our support team is just a click away and ready to assist you.",
    heading: "Need Help?",
  },
];

function RestPassword() {
  useEffect(function () {
    document.title = `${document.title.split("|")[0]} | Rest Password`;
  }, []);
  return (
    <RegisterPage sliderContent={sliderContent}>
      <RestPasswordForm />
    </RegisterPage>
  );
}

function RestPasswordForm() {
  return (
    <div className="p-10">
      <div className="text-center mb-10">
        <h1 className=" text-2xl text-gray-900 dark:text-zinc-200 font-semiblod mb-1">
          Reset account password
        </h1>
        <p className="mx-auto text-sm text-zinc-500 max-w-96">
          Please enter the new password for MetaBlogs Account.
        </p>
      </div>
      <Form />
      <div className="text-center">
        <Link
          to="/login"
          className="font-light mt-5 inline-block text-sm text-blue-600 dark:text-blue-500 hover:underline"
        >
          Back To Login
        </Link>
      </div>
    </div>
  );
}

function Form() {
  const [searchParams, setSearchParams] = useSearchParams();
  const token = searchParams.get("token");
  const navigate = useNavigate();
  const {
    formState: { isSubmitting, errors },
    register,
    handleSubmit,
    watch,
  } = useForm();
  async function submit(data) {
    try {
      console.log(data);
      const response = await resetPassword(data, token);
      console.log(response);
      if (response.status === "success") {
        toast.success("Password Reset Successfully");
        navigate("/login");
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      toast.error("Check The Internet Connect");
    }
  }
  const password = watch("Password");
  return (
    <form onSubmit={handleSubmit(submit)}>
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
        label={isSubmitting ? "Loading..." : "Reset password"}
        disable={isSubmitting}
      />
    </form>
  );
}

export default RestPassword;
