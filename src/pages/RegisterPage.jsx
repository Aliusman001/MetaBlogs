import SliderComponet from "../usefullComponents/Slider";

function RegisterPage({ sliderContent, children }) {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <div className="grid bg-white dark:bg-gray-800 md:grid-cols-2 grid-cols-1 basis-[1200px] shadow-sm shadow-gray-900 h-fit mx-3">
        <div className="dark:border-zinc-500 border-dotted border-r-2 md:flex hidden md:justify-center md:items-center w-full h-full">
          <SliderComponet contents={sliderContent} />
        </div>
        {children}
      </div>
    </div>
  );
}

export default RegisterPage;
