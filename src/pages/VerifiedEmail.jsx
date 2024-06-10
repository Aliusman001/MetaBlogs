import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { verifiedEmail } from "../apis/apis";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../usefullComponents/Loader";
import { useDispatch } from "react-redux";

function VerifiedEmail() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const token = searchParams.get("token");
  const { isLoading, error, data } = useQuery({
    queryKey: ["verified", token],
    queryFn: verifiedEmail,
  });
  useEffect(function () {
    document.title = `${document.title.split("|")[0]} | Verified Email`;
  }, []);
  useEffect(
    function () {
      let time;
      if (data?.status === "success") {
        toast.success("You're verified Successfully!");
        localStorage.setItem("user", JSON.stringify(data.data.user));
        localStorage.setItem("token", JSON.stringify(data.token));
        dispatch(loginAction(data.data.user));
        queryClient.invalidateQueries();
        queryClient.clear();
        time = setTimeout(() => {
          navigate("/");
        }, 2000);
      }
      return () => {
        clearTimeout(time);
      };
    },
    [data, navigate]
  );
  if (isLoading) {
    return <Loader />;
  }

  if (data?.status === "Fail" || data?.status === "Error" || error) {
    return (
      <div className="flex justify-center h-screen items-center">
        <div>
          <div className="text-center dark:text-gray-200">
            <img
              src="/cross.svg"
              alt="Email verification svg"
              className="inline-block mx-auto mb-5"
            />
            <h1 className="text-xl mb-1">Verification Error</h1>
            <p className="max-w-[570px] mb-5">
              Thank you for your support, But we n't verified your email address
              due to {data?.message || "Check Internet Connection"}
            </p>
          </div>
        </div>
      </div>
    );
  }
  if (data?.status === "success") {
    return (
      <div className="flex justify-center h-screen items-center">
        <div className="text-center dark:text-gray-200">
          <img
            src="/check.svg"
            alt="Email verification svg"
            className="inline-block mx-auto mb-5"
          />
          <h1 className="text-xl mb-1">Verification Success</h1>
          <p className="max-w-[570px] mb-5">
            Thank you for your support, we have successfully verified your email
            address You can now proceed to you home page.
          </p>

          <span>Redircting.....</span>
        </div>
      </div>
    );
  }
}

export default VerifiedEmail;
