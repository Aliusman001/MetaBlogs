import Card from "../usefullComponents/Card";
import LazyLoad from "react-lazyload";
import { useSelector } from "react-redux";
import CardPlaceholder from "../usefullComponents/CardPlaceholder";
import ImagePlaceholder from "../usefullComponents/ImagePlaceholder";
import { memo } from "react";
import Message from "../usefullComponents/Message";

function Header({ data }) {
  const host = useSelector((store) => store.account.host);
  return (
    <>
      {data?.error && <Message message={data?.error?.message} />}
      {!data?.error && (
        <LazyLoad height={664} offset={100} placeholder={<HeaderPlaceholder />}>
          <div className="relative h-[664px] mb-20 max-w-screen-xl mx-auto">
            {data?.isLoading && <HeaderPlaceholder />}
            {data?.title && (
              <>
                <img
                  src={`${host}/images/blogs/${data?.titleImage}`}
                  className="mx-auto mt-2 ring-gray-100  rounded-md w-full h-full  object-cover"
                  alt="blog title image"
                />
                <Card
                  author={data?.username || data?.author?.username}
                  catagory={data?.catagory}
                  title={data?.title}
                  photo={data?.photo || data?.author?.photo}
                  date={data?.date || data?.createdAt}
                />
              </>
            )}
          </div>
        </LazyLoad>
      )}
    </>
  );
}
function HeaderPlaceholder() {
  return (
    <ImagePlaceholder height="min-h-[664px]" weight="max-w-full">
      <CardPlaceholder />
    </ImagePlaceholder>
  );
}

export default memo(Header);
