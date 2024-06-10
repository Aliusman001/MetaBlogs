import React from "react";

function UserInfo({
  photo = "/profile.svg",
  username = "Jason Francisco",
  date = "August 20, 2022",
  className = "",
}) {
  const formatedDate = new Intl.DateTimeFormat("en-us", {
    month: "long",
    year: "numeric",
    day: "2-digit",
  }).format(new Date(date));

  return (
    <div
      className={`${className} mt-5 text-[var(--textColor)]   flex items-center md:gap-5 justify-between`}
    >
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 border rounded-full">
          <img
            src={photo}
            className="w-full h-full rounded-full object-cover"
            alt=""
          />
        </div>
        <i className="text-base font-normal">{username}</i>
      </div>
      <p className="text-base">{formatedDate}</p>
    </div>
  );
}

export default UserInfo;
