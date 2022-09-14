import React, { useEffect, useState } from "react";

const Suggestions = () => {
  const [Suggestion, setSuggestion] = useState([]);

  const Suggestions = [
    {
      id: 1,
      avatar: "/avatar-1.png",
      userName: "Audreanne",
      companyName: "works at Miller-Grady",
    },
    {
      id: 2,
      avatar: "/avatar-2.png",
      userName: "Shemar_Rampal",
      companyName: "Works At Jenkis",
    },
    {
      id: 3,
      avatar: "/avatar-3.png",
      userName: "Raymond Marvin",
      companyName: "Works At Wretch LLC.",
    },
    {
      id: 4,
      avatar: "/avatar-4.png",
      userName: "Norberto Lind",
      companyName: "Works At Strcich & Sons",
    },
    {
      id: 5,
      avatar: "/avatar-5.png",
      userName: "Kathleen Moorhead",
      companyName: "Works At Production Occupations",
    },
  ];

  useEffect(() => {
    setSuggestion(Suggestions);
  }, []);

  return (
    <div className="mt-4 ml-10">
      <div className="flex justify-between text-sm mb-5">
        <h3 className="text-sm font-bold text-gray-400 pl-5">
          Suggestions For You
        </h3>
        <button className="text-gray-600 font-semibold pr-6">See All</button>
      </div>

      {Suggestion.map((profile) => (
        <div
          key={profile.id}
          className="flex items-center justify-between mt-3"
        >
          <img
            src={profile.avatar}
            className="w-14 h-14 rounded-full border p-[2px] ml-4"
            alt="Profile pic"
          />

          <div className="flex-1 ml-4">
            <h2 className="font-semibold text-sm">{profile.userName}</h2>
            <h3 className="text-xs text-gray-400 w-32 truncate">
              {profile.companyName}
            </h3>
          </div>

          <button className="text-blue-400 text-sm font-bold pr-6">
            Follow
          </button>
        </div>
      ))}
    </div>
  );
};

export default Suggestions;
