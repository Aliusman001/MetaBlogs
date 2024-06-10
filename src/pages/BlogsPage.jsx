import { useQuery } from "@tanstack/react-query";
import { fetchBlogs } from "../apis/apis";
import { useEffect, useMemo, useRef, useState } from "react";
import PostGrid from "../components/PostGrid";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Message from "../usefullComponents/Message";

function BlogsPage() {
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const { data, isLoading, error } = useQuery({
    queryKey: ["blogPage", page],
    queryFn: fetchBlogs,
  });
  const postGrid = useRef(null);

  useEffect(function () {
    document.title = `${document.title.split("|")[0]} | Blogs`;
  }, []);

  useEffect(
    function () {
      if (data) {
        setTotalPages(data.pages);
      }
    },
    [data]
  );
  const blogCard = useMemo(() => {
    return {
      blogs: data?.data?.blogs,
      isLoading,
    };
  }, [error, data?.data?.blogs, isLoading]);
  return (
    <>
      {error && <Message message={error.message} />}
      {!error && (
        <div className="mt-5 mx-auto max-w-screen-xl">
          <PostGrid data={blogCard} refs={postGrid} />
          <PaginationComponet
            setPage={setPage}
            totalPages={totalPages}
            refs={postGrid}
          />
        </div>
      )}
    </>
  );
}

function PaginationComponet({ setPage, totalPages, refs }) {
  return (
    <Stack spacing={2} className=" mt-10">
      <Pagination
        className="flex justify-center"
        count={totalPages}
        onChange={(_, page) => {
          setPage(page);
          refs.current.scrollIntoView({ behavior: "smooth" });
        }}
        variant="outlined"
        shape="rounded"
      />
    </Stack>
  );
}

export default BlogsPage;
