import ClipLoader from "react-spinners/ClipLoader";
function Loader() {
  return (
    <div className="flex justify-center mb-5 h-screen items-center">
      <ClipLoader color="gray" />
    </div>
  );
}

export default Loader;
