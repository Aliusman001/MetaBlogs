import SliderComponet from "../usefullComponents/Slider";

function UnAuthorizedPage() {
  return (
    <div className="max-w-screen-sm  mt-5 mx-auto overflow-hidden">
      <SliderComponet
        contents={[{ img: "/login1.jpg" }, { img: "/login2.jpg" }]}
      />
      <p className="text-center">
        You are unauthorized to access this page. To view this content, you must
        first log in to your account. If you don't have an account, please
        register to gain access. For further assistance, contact our support
        team.
      </p>
    </div>
  );
}

export default UnAuthorizedPage;
