import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function SliderComponet({ contents }) {
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  return (
    <div className="h-fit max-w-full mx-auto">
      <Slider {...settings}>
        {contents.map((v, i) => {
          return (
            <div key={i} className="h-full w-fit">
              <div className="h-[400px] w-fit mx-auto">
                <img
                  src={v.img}
                  className="object-cover h-full"
                  alt="Login Page"
                />
              </div>
              {v?.text && (
                <div className="text-center mt-5 mb-5">
                  <h1 className="text-2xl dark:text-zinc-200">{v.heading}</h1>
                  <p className="max-w-[450px] mx-auto text-sm mt-2 text-zinc-500">
                    {v.text}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </Slider>
      <span className="opacity-0">.</span>
    </div>
  );
}
