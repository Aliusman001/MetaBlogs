import { memo, useEffect, useMemo } from "react";
import Header from "../components/Header";
import PostGrid from "../components/PostGrid";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { fetchLatestBlogs, getLatestBlog } from "../apis/apis";
import LoadButton from "../usefullComponents/LoadButton";
import GridPlaceholder from "../usefullComponents/GridPlaceholder";
import Message from "../usefullComponents/Message";

function HomePage() {
  useEffect(function () {
    document.title = `${document.title.split("|")[0]} | Home`;
  }, []);
  const {
    data: latestBlog,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["latest"],
    queryFn: getLatestBlog,
  });
  const latest = useMemo(() => {
    if (latestBlog) {
      const {
        titleImage,
        catagory,
        date,
        title,
        author: { username, photo },
      } = latestBlog.data.blogs[0];
      return {
        error,
        isLoading,
        titleImage,
        username,
        catagory,
        title,
        photo,
        date,
      };
    } else {
      return { error, isLoading };
    }
  }, [latestBlog, error, isLoading]);

  return (
    <>
      {error && <Message message={error.message} />}
      {!error && (
        <div className="max-w-screen-xl mx-auto">
          <Header data={latest} />
          <LatestBlogs />
        </div>
      )}
    </>
  );
}
const LatestBlogs = memo(function LatestBlogs() {
  const {
    data,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["latestBlogs"],
    queryFn: fetchLatestBlogs,
    getNextPageParam: (currentPage, pages) => {
      return currentPage.nextPage === 3 ? null : currentPage.nextPage;
    },
  });

  return (
    <div>
      {!error && (
        <h1 className="mx-auto mb-5 max-w-screen-xl text-2xl font-bold dark:text-white text-black">
          Latest
        </h1>
      )}
      {isLoading && (
        <div className="grid md:grid-cols-3 md:justify-items-start sm:grid-cols-2 grid-cols-1 items-center justify-items-center gap-y-10 ">
          {Array.from({ length: 3 }, (v, i) => {
            return <GridPlaceholder key={i} />;
          })}
        </div>
      )}
      {data?.pages.map((v, i) => {
        v.data.error = error;
        v.data.isLoading = isFetchingNextPage;
        return <PostGrid data={v.data} key={i} sx={{ marginBottom: "20px" }} />;
      })}
      {hasNextPage && (
        <div className="flex justify-center">
          <LoadButton
            title={isFetchingNextPage ? "Loading..." : "Load More Blogs"}
            clickHandle={() => {
              fetchNextPage();
            }}
            disabled={!hasNextPage}
          />
        </div>
      )}
    </div>
  );
});

export default HomePage;
