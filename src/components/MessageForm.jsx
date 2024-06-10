import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createComment } from "../apis/apis";
import { login as loginAction } from "../store/reducer";

function MessageForm({ blog }) {
  const user = useSelector((store) => store.account.user);
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const {
    register,
    formState: { isSubmitting },
    handleSubmit,
    reset,
  } = useForm();

  async function submit(data) {
    try {
      if (!user?._id) {
        return navigate("/login");
      }
      const formData = {
        content: data.content,
        auther_id: user._id,
        blog_id: blog._id,
      };
      const response = await createComment(formData);
      if (response.status === "success") {
        toast.success("Comment post successfully");
        reset();
        queryClient.invalidateQueries({
          predicate: (query) => query.queryKey[0] === "userComments",
        });
      } else {
        toast.error(error.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <>
      <form className="mt-10 md:mx-0 mx-5" onSubmit={handleSubmit(submit)}>
        <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
          <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
            <label htmlFor="comment" className="sr-only">
              Your comment
            </label>
            <textarea
              id="comment"
              rows="4"
              className="w-full  p-2 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
              placeholder="Write a comment..."
              required
              {...register("content")}
            ></textarea>
          </div>
          <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
            >
              {isSubmitting ? "Loading..." : "Post comment"}
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
export default MessageForm;
