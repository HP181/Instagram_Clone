import React from "react";
import { signOut, useSession } from "next-auth/react";

const MiniProfile = () => {
  const { data: session } = useSession();

  return (
    <div className="flex items-center justify-between mt-4 p-4 ml-10">
      <img
        src={session?.user?.image}
        className="w-14 h-14 rounded-full border p-[2px] object-cover cursor-pointer "
        alt=""
      />

      <div className="flex-1 mx-4">
        <h2 className="font-bold">{session?.user?.name}</h2>
        <h3 className="text-sm text-gray-400">Welcome to instagram</h3>
      </div>

      <button
        className="text-blue-400 text-sm font-semibold "
        onClick={() => signOut({ redirect: false })}
      >
        Sign Out
      </button>
    </div>
  );
};

export default MiniProfile;
