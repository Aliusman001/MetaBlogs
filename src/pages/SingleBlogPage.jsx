import React from "react";
import { getBlog } from "../apis/apis";
import { toast } from "react-toastify";
import { useLoaderData } from "react-router-dom";
import SingleBlog from "../components/SingleBlog";

function SingleBlogPage() {
  const loaderData = useLoaderData();
  let error = {};
  let result = {};
  if (loaderData.status === "error") {
    error = { ...loaderData };
  } else {
    result = { ...loaderData };
  }
  if (Object.keys(error).length > 0) {
    return (
      <div className="flex justify-center">
        <p>{error && error.message}</p>
      </div>
    );
  }

  return <SingleBlog result={result} />;
}
export async function loader({ params }) {
  try {
    const response = await getBlog(params.id);
    if (response.status === "success") {
      return { status: "success", data: response.data.blog };
    } else if (response.status === "Error" || response.status === "Fail") {
      toast.error(response.message);
      return { status: "error", message: response.message };
    }
  } catch (error) {
    toast.error(error.message);
    return { status: "error", message: error.message };
  }
}

export default SingleBlogPage;
