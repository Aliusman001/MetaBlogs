function Message({ message }) {
  return (
    <div className="flex justify-center h-screen items-center">
      <div>
        <div className="text-center dark:text-gray-200">
          <img
            src="/cross.svg"
            alt="Email verification svg"
            className="inline-block mx-auto mb-5"
          />
          <h1 className="text-xl mb-1">Connection Error</h1>
          <p className="max-w-[570px] mb-5">
            We're having trouble connecting to the server. Please check your
            internet connection and try again. {message}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Message;
