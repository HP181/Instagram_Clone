import React from "react";
import Post from "./Post";

const posts = [
  {
    "id": 1,
    "username": "hkp",
    "userImage": "/hp.jpg",
    "image": "/hp.jpg",
    "caption": "Its Greatest Hkp",
  },
  {
    "id": 2,
    "username": "hkp",
    "userImage": "/hp.jpg",
    "image": "/hp.jpg",
    "caption": "Its Greatest Hkp",
  },
  {
    "id": 3,
    "username": "hkp",
    "userImage": "/hp.jpg",
    "image": "/hp.jpg",
    "caption": "Its Greatest Hkp",
  },
];

const Posts = () => {
  return (
    <div>
      {posts.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          userName={post.username}
          userImg={post.userImage}
          img={post.image}
          caption={post.caption}
        />
      ))}
    </div>
  );
};

export default Posts;
