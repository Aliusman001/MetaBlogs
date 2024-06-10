import { useEffect, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { dislikeMessage, likeMessage } from "../apis/apis";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { HiHeart } from "react-icons/hi";

export default function Like({ value, user }) {
  const [like, setLike] = useState(false);
  const [likeId, setLikeId] = useState(null);
  const [num, setNum] = useState(0);

  const { data, refetch } = useQuery({
    queryKey: ["like", value._id],
    queryFn: () => likeMessage({ author: user._id, comment: value._id }),
    enabled: false,
  });
  const { mutate: dislike } = useMutation({
    mutationFn: (id) => dislikeMessage(id),
    onSuccess: () => {
      setLike(false);
      setNum((c) => c - 1);
      setLikeId(null);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  useEffect(function () {
    value.likes.map((v) => {
      if (v.author === user?._id) {
        setLike(true);
        setLikeId(v._id);
      }
    });
  }, []);

  useEffect(() => {
    if (value?.likes) {
      setNum(value.likes.length);
    }
  }, []);

  useEffect(
    function () {
      if (data?.data) {
        setLikeId(data.data.messageLike._id);
      }
    },
    [data]
  );

  return (
    <div className="  flex gap-1 items-center ">
      <HiHeart
        onClick={() => {
          if (!like) {
            refetch();
            setLike(true);
            setNum((c) => c + 1);
          } else {
            dislike(likeId);
          }
        }}
        size={15}
        fill={like ? "red" : "none"}
        stroke={like ? "none" : "#a1a1aa"}
        strokeWidth={2}
      />
      <span className="text-sm">{num}</span>
    </div>
  );
}
