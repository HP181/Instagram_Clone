import React, { useEffect, useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { HiOutlinePaperAirplane } from "react-icons/hi";
import { FaRegCommentDots } from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import { BiBookmark } from "react-icons/bi";
import { TbMoodSmile } from "react-icons/tb";
import { useSession } from "next-auth/react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db } from "../Firebase";
import Moment from "react-moment";

const Post = ({ id, userName, userImg, img, caption }) => {
  const { data: session } = useSession();
  const [Comment, setComment] = useState("");
  const [Comments, setComments] = useState([]);
  const [Likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(
    () =>
      onSnapshot(
        query(
          collection(db, "posts", id, "comments"),
          orderBy("timestamp", "desc")
        ),
        (snapshot) => setComments(snapshot.docs)
      ),
    [db]
  );

  useEffect(
    () =>
      onSnapshot(collection(db, "posts", id, "likes"), (snapshot) =>
        setLikes(snapshot.docs)
      ),
    [db, id]
  );

  useEffect(
    () =>
      setHasLiked(
        Likes.findIndex((like) => like.id === session?.user?.uid) !== -1
      ),
    [Likes]
  );

  const likePost = async () => {
    if (hasLiked) {
      await deleteDoc(doc(db, "posts", id, "likes", session.user.uid));
    } else {
      await setDoc(doc(db, "posts", id, "likes", session.user.uid), {
        username: session.user.name,
      });
    }
  };

  const sendComment = async (e) => {
    e.preventDefault();

    const commentToSend = Comment;
    setComment("");

    await addDoc(collection(db, "posts", id, "comments"), {
      Comment: commentToSend,
      username: session.user.name,
      userImage: session.user.image,
      timestamp: serverTimestamp(),
    });
  };

  return (
    <div className="bg-white my-5 border rounded-md">
      {/* Header  */}
      <div className="flex items-center p-2">
        <img
          src={userImg}
          className="rounded-full h-14 w-14 cursor-pointer object-cover border p-1 mr-3"
          alt="user profile"
        />
        <p className="flex-1 font-bold text-lg">{userName}</p>
        <BsThreeDots className="h-5 cursor-pointer" />
      </div>

      {/* postImage  */}
      <img src={img} className="object-cover w-full h-[90vh]" alt="" />

      {/* Buttons  */}
      {session && (
        <div className="flex justify-between px-4 pt-4">
          <div className="flex space-x-4 ">
            {hasLiked ? (
              <AiFillHeart
                size={25}
                color="red"
                onClick={likePost}
                className="btn "
              />
            ) : (
              <AiOutlineHeart size={25} onClick={likePost} className="btn " />
            )}

            <FaRegCommentDots size={25} className="btn " />
            <HiOutlinePaperAirplane size={25} className="btn " />
          </div>

          <BiBookmark size={25} className="btn" />
        </div>
      )}

      {/* Caption  */}
      <p className="p-5 truncate">
        {Likes.length > 0 && (
          <p className="font-bold mb-1">{Likes.length} Likes</p>
        )}
        <span className="font-bold mr-1">{userName}</span>
        {caption}
      </p>

      {/* Comments  */}
      {Comments.length > 0 && (
        <div className="ml-10 h-20 overflow-y-scroll scrollbar-thumb-black scrollbar-thin">
          {Comments.map((comment) => (
            <div key={comment.id} className="flex items-center space-x-2 mb-3">
              <img
                src={comment.data().userImage}
                className="h-7 rounded-full"
                alt=""
              />
              <p className="text-sm flex-1">
                <span className="font-bold pr-3">
                  {comment.data().username}
                </span>
                {comment.data().Comment}
              </p>
              <Moment fromNow className="pr-5 text-xs">
                {comment.data().timestamp?.toDate()}
              </Moment>
            </div>
          ))}
        </div>
      )}

      {/* input  */}

      {session && (
        <form className="flex items-center p-4">
          <TbMoodSmile size={25} className="cursor-pointer" />
          <input
            type="text"
            className="border-none flex-1 focus:ring-0 outline-none"
            value={Comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a Comment"
          />
          <button
            className="font-semibold text-blue-400"
            type="submit"
            disabled={!Comment.trim()}
            onClick={sendComment}
          >
            Post
          </button>
        </form>
      )}
    </div>
  );
};

export default Post;
