import UserInfo from "../usefullComponents/UserInfo";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import LazyLoad from "react-lazyload";
import GridPlaceholder from "../usefullComponents/GridPlaceholder";
import { memo } from "react";
import { CardActionArea } from "@mui/material";
import Message from "../usefullComponents/Message";

function PostGrid({ data, sx, refs = null }) {
  return (
    <div style={sx} ref={refs}>
      <div className="grid w-full md:grid-cols-3 sm:grid-cols-2 grid-cols-1 items-center justify-self-center gap-y-10 overflow-hidden">
        {data?.blogs?.length > 0 &&
          data?.blogs.map((v, i) => {
            return (
              <LazyLoad
                offset={100}
                height={538}
                style={{ width: "100%" }}
                placeholder={<GridPlaceholder />}
                key={i}
              >
                <Card data={v} />
              </LazyLoad>
            );
          })}
        {data?.isLoading &&
          Array.from({ length: 6 }, (v, i) => {
            return <GridPlaceholder key={i} />;
          })}
      </div>

      {data?.error?.message && (
        <p className="text-red-500 text-center">{data?.error.message}</p>
      )}
    </div>
  );
}
const Card = memo(function Card({ data }) {
  const navigate = useNavigate();
  const host = useSelector((store) => store.account.host);
  return (
    <CardActionArea className="!max-w-[350px] !mx-auto">
      <div
        onClick={() => {
          navigate(`/blog/${data._id}`);
        }}
        className="max-w-[350px] md:mx-0 dark:bg-gray-800 bg-white h-[530px] p-5 
      border-[0.1px] dark:hover:bg-gray-900 hover:bg-gray-100 cursor-pointer dark:border-white/20 border-zinc-200 rounded-md transition-all mx-auto"
      >
        <div className="w-full h-full relative">
          <div className="h-60">
            <img
              src={`${host}/images/blogs/${data.titleImage}`}
              alt="Blog title Image"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="mt-5">
            <span
              className="bg-blue-500 bg-opacity-40 font-medium text-blue-950 rounded-sm
             text-sm p-2"
            >
              {data.catagory}
            </span>
            <h2 className="text-2xl mt-5 dark:text-white text-gray-900">
              {data.title}
            </h2>
          </div>
          <UserInfo
            img={`${host}/images/user/${data?.author?.photo}`}
            username={data.author.username}
            date={data.createdAt}
            className="bottom-0 w-full absolute"
          />
        </div>
      </div>
    </CardActionArea>
  );
});

export default memo(PostGrid);
