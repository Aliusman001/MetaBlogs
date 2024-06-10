import { useEffect, useMemo } from "react";
import Header from "./Header";
import BlogContent from "./BlogContent";
import Message from "./Message";

function SingleBlog({ result }) {
  const { data } = result;
  const blogData = useMemo(() => data, [data]);
  useEffect(function () {
    document.title = `${document.title.split("|")[0]} | ${data.title}`;
  }, []);
  return (
    <>
      <Header data={blogData} />
      <BlogContent data={blogData} />
      <Message blog={blogData} />
    </>
  );
}

export default SingleBlog;
