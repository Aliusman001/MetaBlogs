import UserInfo from "./UserInfo";

export default function Card({ catagory, title, author, date, photo }) {
  return (
    <div className="max-w-[598px] dark:bg-gray-800 dark:shadow-gray-900  shadow shadow-gray-200 mx-3 md:p-8 py-12 px-5 absolute -bottom-16 md:left-16 left-0  rounded-md bg-white">
      <span className="bg-blue-700 text-sm   text-white p-3 rounded-xl">
        {catagory}
      </span>
      <h1 className="text-[var(--headingColor)] dark:text-zinc-300 text-2xl  md:text-4xl mt-5">
        {title}
      </h1>
      <UserInfo img={photo} username={author} date={date} />
    </div>
  );
}
