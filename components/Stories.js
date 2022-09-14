import React, { useEffect, useState } from "react";
import Story from "./Story";
import { signIn, useSession } from "next-auth/react";

const Stories = () => {
  const [Suggestions, setSuggestions] = useState([]);

  const { data: session } = useSession();

  const data = [
    {
      id: 1,
      avatar: "avatar-1.png",
      username: "Roger Lanning",
    },
    {
      id: 2,
      avatar: "avatar-2.png",
      username: "Edward Castillo",
    },
    {
      id: 3,
      avatar: "avatar-3.png",
      username: "Carlos Sandoval",
    },
    {
      id: 4,
      avatar: "avatar-4.png",
      username: "Gina Jurado",
    },
    {
      id: 5,
      avatar: "avatar-5.png",
      username: "Louis Everette",
    },
    {
      id: 7,
      avatar: "avatar-6.png",
      username: "David Martin",
    },
    {
      id: 8,
      avatar: "avatar-7.png",
      username: "Vincent Thoreson",
    },
    {
      id: 9,
      avatar: "avatar-8.png",
      username: "Brian Delong",
    },
    {
      id: 10,
      avatar: "avatar-9.png",
      username: "Christopher Alexander",
    },
    {
      id: 11,
      avatar: "avatar-10.png",
      username: "Rod Berrios",
    },
    {
      id: 12,
      avatar: "avatar-11.png",
      username: "Richard McAlpine",
    },
    {
      id: 13,
      avatar: "avatar-12.png",
      username: "Mark Murphy",
    },
    {
      id: 14,
      avatar: "avatar-13.png",
      username: "Robert Haggard",
    },
    {
      id: 15,
      avatar: "avatar-14.png",
      username: "Nicholas Regan",
    },
    {
      id: 16,
      avatar: "avatar-15.png",
      username: "Christopher Wright",
    },
    {
      id: 17,
      avatar: "avatar-16.png",
      username: "Carlos Linthicum",
    },
  ];

  useEffect(() => {
    setSuggestions(data);
  }, []);

  return (
    <div className="flex space-x-2 p-4 bg-white mt-4 border-gray-200 border rounded-sm overflow-x-scroll scrollbar-thin scrollbar-thumb-black ">
      {session && (
        <Story img={session?.user?.image} userName={session?.user?.name} />
      )}

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
