import LazyLoad from "react-lazyload";
import { useSelector } from "react-redux";
import PlaceholderText from "../usefullComponents/PlaceholderText";
import { memo } from "react";
import ImagePlaceholder from "../usefullComponents/ImagePlaceholder";

export default memo(function BlogContent({ data }) {
  const host = useSelector((store) => store.account.host);
  return (
    <div className="max-w-screen-lg md:px-0 px-2 mx-auto dark:text-zinc-300">
      <LazyLoad
        height={100}
        offset={-100}
        className="w-full"
        placeholder={<PlaceholderText />}
      >
        <p>{data.mainContent}</p>
      </LazyLoad>
      {data.description.map((v, i) => {
        return (
          <div key={i} className="mt-5 ">
            <LazyLoad
              height={100}
              offset={-100}
              className="w-full"
              placeholder={<PlaceholderText />}
            >
              <h2 className="mt-3 font-medium text-xl">
                {i + 1}) {v.heading}
              </h2>
              <p className="mt-2">{data.description[0].content}</p>
            </LazyLoad>
            <LazyLoad
              height={100}
              offset={-100}
              className="w-full mt-5"
              placeholder={<PlaceholderText />}
            >
              <h3 className="mt-5 font-medium text-lg">{v.subheading}</h3>
              <ul className="list-disc list-inside mt-2">
                {v.lists.map((v, i) => {
                  return (
                    <li key={i}>
                      <span className="font-medium">{v.split(":")[0]}:</span>
                      <span>{v.split(":")[1]}</span>
                    </li>
                  );
                })}
              </ul>
            </LazyLoad>
          </div>
        );
      })}
      <div className="mt-10 flex flex-wrap gap-2  justify-center">
        {data.images.map((v, i) => {
          return (
            <LazyLoad
              height={320}
              key={i}
              offset={100}
              placeholder={<ImagePlaceholder />}
            >
              <div className="h-80 max-w-80 overflow-hidden">
                <img
                  src={`${host}/images/blogs/${v}`}
                  alt={data.title}
                  className="w-full h-full object-cover hover:scale-105 transition-all rounded-sm"
                />
              </div>
            </LazyLoad>
          );
        })}
      </div>
    </div>
  );
});
