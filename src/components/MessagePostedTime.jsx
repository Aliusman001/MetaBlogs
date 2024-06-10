import timeStamp from "../utils/timeStamp";

function MessagePostedTime({ value }) {
  const time = timeStamp(value.createdAt);
  return (
    <div className="flex justify-between  w-52 text-sm italic">
      <p>{value.auther_id.username}</p>
      {time?.hours && <p>{`${time.hours}h ago`}</p>}
      {time?.minutes && <p>{`${time.minutes} minutes ago`}</p>}
      {time?.weeks && <p>{`${time.weeks} weeks ago`}</p>}
      {time?.seconds && <p>{`${time.seconds} seconds ago`}</p>}
    </div>
  );
}

export default MessagePostedTime;
