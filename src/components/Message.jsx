import { useSelector } from "react-redux";

import LoadButton from "../usefullComponents/LoadButton";
import {
  useQueryClient,
  useMutation,
  useQuery,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useRef } from "react";
import {
  deleteComment,
  editComment,
  fetchcomments,
  getUsercomments,
  notLoginfetchcomments,
} from "../apis/apis";
import { useState, useEffect, memo } from "react";
import Like from "./Like";
import { toast } from "react-toastify";
import CommentPlacholder from "../usefullComponents/CommentPlacholder";
import Error from "../usefullComponents/Message";
import LazyLoad from "react-lazyload";
import MessageForm from "./MessageForm";
import MessagePostedTime from "./MessagePostedTime";
import { FaTrash } from "react-icons/fa";
import { FaPenToSquare } from "react-icons/fa6";

export default memo(function Message({ blog }) {
  const user = useSelector((store) => store.account.user);
  const {
    data: comments,
    isLoading,
    error: userError,
  } = useQuery({
    queryKey: ["userComments", blog._id],
    queryFn: () => getUsercomments(blog._id, user._id),
    enabled: user?.username ? true : false,
  });

  const {
    data,
    isLoading: loading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    error: fetchError,
  } = useInfiniteQuery({
    queryKey: ["comments", blog._id],
    queryFn: fetchcomments,
    getNextPageParam: (lastPage) => {
      return lastPage.nextPage;
    },
    enabled: user?.username ? true : false,
  });

  const {
    data: comment,
    isLoading: Loading,
    fetchNextPage: nextPagefetch,
    hasNextPage: hasnext,
    isFetchingNextPage: Fetchingnextpage,
    error: notUserError,
  } = useInfiniteQuery({
    queryKey: ["notlogincomments", blog._id],
    queryFn: notLoginfetchcomments,
    getNextPageParam: (lastPage) => {
      return lastPage.nextPage;
    },
    enabled: !user?.username ? true : false,
  });
  const fetchCommentError = userError || fetchError || notUserError;
  return (
    <div className="max-w-screen-xl mx-auto">
      <h1 className="text-center mt-10 text-3xl dark:text-zinc-300">
        Comments
      </h1>

      {/* User Comments */}
      {user && (
        <>
          {comments?.data.comment && (
            <MessageContent messages={comments?.data.comment} user={user} />
          )}
          {data?.pages.map((v, i) => (
            <MessageContent messages={v.data.comment} user={user} key={i} />
          ))}
          {hasNextPage && (
            <LoadButton
              clickHandle={() => {
                fetchNextPage();
              }}
              disabled={!hasNextPage}
              title={isFetchingNextPage ? "Loading..." : "Load more"}
            />
          )}
        </>
      )}
      {/*Not User Comments */}
      {!user && (
        <>
          {comment?.pages.map((v, i) => (
            <MessageContent messages={v.data.comment} key={i} />
          ))}
          {hasnext && (
            <LoadButton
              clickHandle={() => {
                nextPagefetch();
              }}
              disabled={!hasnext}
              title={Fetchingnextpage ? "Loading..." : "Load more"}
            />
          )}
        </>
      )}
      {/* ERROR || LOADING */}
      {(loading || Loading || isLoading) && <CommentPlacholder />}
      {fetchCommentError && !fetchCommentError.message.startsWith("Not") && (
        <Error message={fetchCommentError.message} />
      )}

      <div className="mt-10 max-w-screen-xl mx-auto">
        <MessageForm blog={blog} />
      </div>
    </div>
  );
});

function MessageContent({ messages, user }) {
  const host = useSelector((store) => store.account.host);
  return (
    <div className="max-w-screen-xl mx-auto ">
      {messages.map((v, i) => {
        return (
          <LazyLoad
            key={i}
            offset={100}
            height={540}
            placeholder={<CommentPlacholder />}
          >
            <div className="flex gap-3 mx-3 md:w-1/2 w-[90%] mt-5">
              <img
                className="w-12 h-12  rounded-full"
                src={
                  v?.auther_id?.photo
                    ? `${host}/images/user/${v?.auther_id?.photo}`
                    : "/profile.svg"
                }
                alt="Rounded avatar"
              />

              <MessageData data={v} user={user} />
            </div>
          </LazyLoad>
        );
      })}
    </div>
  );
}
function MessageData({ data, user }) {
  const queryClient = useQueryClient();
  const { isLoading, mutate } = useMutation({
    mutationFn: (id) => deleteComment(id),
    onerror: (error) => {
      toast.success("Not Deleted successfully");
      console.log(error);
    },
    onSuccess: () => {
      toast.success("Deleted successfully");
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === "userComments",
      });
    },
  });

  const { isLoading: editLoading, mutate: editFn } = useMutation({
    mutationFn: (data) => editComment(data),
    onerror: (error) => {
      toast.success("Not Editd successfully");
      console.log(error);
    },
    onSuccess: () => {
      toast.success("Editd successfully");
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === "userComments",
      });
    },
  });
  const [edit, setEdit] = useState(false);
  const {
    register,
    formState: { isSubmitting },
    handleSubmit,
  } = useForm();

  function submit(dataOb) {
    dataOb.id = data._id;
    editFn(dataOb);
    setEdit(false);
  }
  const messageContainer = useRef(null);
  function handleMessageContainer(e) {
    if (!messageContainer.current?.contains(e.target)) {
      setEdit(false);
    }
  }
  useEffect(function () {
    document.addEventListener("click", handleMessageContainer);
    return () => {
      document.removeEventListener("click", handleMessageContainer);
    };
  }, []);
  return (
    <div
      ref={messageContainer}
      className="dark:text-gray-400 text-gray-500 flex-1 p-2 px-4 pb-3 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
    >
      <MessagePostedTime value={data} />
      {edit ? (
        <form onSubmit={handleSubmit(submit)}>
          <textarea
            id="comment"
            rows="4"
            className="w-full  p-2 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
            placeholder="Write a comment..."
            required
            defaultValue={data.content}
            {...register("content")}
          ></textarea>

          <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
            >
              {isSubmitting ? "Loading..." : "Post comment"}
            </button>
          </div>
        </form>
      ) : (
        <>
          <p className="mt-2 dark:text-gray-200 text-gray-700">
            {data.content}
          </p>
          <div className="flex w-48 mt-3 justify-between items-center">
            {user?.username && <Like value={data} user={user} key={data._id} />}
            {user?._id === data.auther_id._id && (
              <>
                <span
                  className=" cursor-pointer"
                  onClick={() => mutate(data._id)}
                >
                  <FaTrash size={15} />
                </span>
                <span
                  className="cursor-pointer"
                  onClick={(e) => {
                    setEdit(true);
                    e.stopPropagation();
                  }}
                >
                  <FaPenToSquare size={15} />
                </span>
                <span>{data.status}</span>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}
