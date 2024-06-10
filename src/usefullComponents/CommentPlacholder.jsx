import UserSvg from "./UserSvg";

function CommentPlacholder() {
  return (
    <div className="flex gap-3 animate-pulse mx-3 md:w-1/2 w-[90%] mt-5 ">
      <UserSvg />

      <div className="border dark:border-gray-700 flex-1 rounded-md p-3">
        <div className="w-48 animate-pulse h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-4"></div>
        <div>
          <div className="h-2.5 animate-pulse bg-gray-200 rounded-full dark:bg-gray-700 w-40 mb-2"></div>
          <div className="h-2.5 animate-pulse bg-gray-200 rounded-full dark:bg-gray-700 w-32 mb-2"></div>
        </div>
      </div>
    </div>
  );
}

export default CommentPlacholder;
