import { memo } from "react";
import Card from "../usefullComponents/Card";
import { useSelector } from "react-redux";
export default memo(function Header({ data }) {
  const host = useSelector((store) => store.account.host);
  return (
    <div className="relative h-[664px] mx-auto max-w-screen-xl">
      <img
        src={`${host}/images/blogs/${data.titleImage}`}
        className="mx-auto mt-2 ring-gray-100  rounded-md w-full h-full  object-cover"
        alt="blog title image"
      />

      <Card
        catagory={data.catagory}
        title={data.title}
        author={data.author.username}
        date={data.createdAt}
        photo={data.author.photo}
      />
    </div>
  );
});
