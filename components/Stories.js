import React, { useEffect, useState } from "react";
import Story from "./Story";

const Stories = () => {
  const [Suggestions, setSuggestions] = useState([]);

  const data = [
    {
      id: 1,
      avatar: "/hp.jpg",
      username: "hit patel",
    },
    {
      id: 2,
      avatar: "/hp.jpg",
      username: "hit patel",
    },
    {
      id: 3,
      avatar: "/hp.jpg",
      username: "hit patel",
    },
    {
      id: 4,
      avatar: "/hp.jpg",
      username: "hit patel",
    },
    {
      id: 5,
      avatar: "/hp.jpg",
      username: "hit patel",
    },
    {
      id: 7,
      avatar: "/hp.jpg",
      username: "hit patel",
    },
    {
      id: 8,
      avatar: "/hp.jpg",
      username: "hit patel",
    },
    {
      id: 9,
      avatar: "/hp.jpg",
      username: "hit patel",
    },
    {
      id: 10,
      avatar: "/hp.jpg",
      username: "hit patel",
    },
    {
      id: 11,
      avatar: "/hp.jpg",
      username: "hit patel",
    },
    {
      id: 12,
      avatar: "/hp.jpg",
      username: "hit patel",
    },
    {
      id: 13,
      avatar: "/hp.jpg",
      username: "hit patel",
    },
    {
      id: 14,
      avatar: "/hp.jpg",
      username: "hit patel",
    },
    {
      id: 15,
      avatar: "/hp.jpg",
      username: "hit patel",
    },
    {
      id: 16,
      avatar: "/hp.jpg",
      username: "hit patel",
    },
    {
      id: 17,
      avatar: "/hp.jpg",
      username: "hit patel",
    },
  ];

  useEffect(() => {
    setSuggestions(data);
  }, []);

  return (
    <div className="flex space-x-2 p-6 bg-white mt-8 border-gray-200 border rounded-sm overflow-x-scroll scrollbar-thin scrollbar-thumb-black ">
      {Suggestions.map((profile) => (
        <Story
          key={profile.id}
          id={profile.id}
          userName={profile.username}
          img={profile.avatar}
        />
      ))}
    </div>
  );
};

export default Stories;
