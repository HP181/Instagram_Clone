import React, { useContext } from "react";
import Image from "next/image";
import { AiOutlinePlusCircle, AiOutlineHeart } from "react-icons/ai";
import { HiHome, HiOutlinePaperAirplane, HiUserGroup } from "react-icons/hi";
import { VscSearch } from "react-icons/vsc";
import { FiMenu } from "react-icons/fi";
import { useSession } from "next-auth/react";
import { signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { GlobalContext } from "../pages/Context/GlobalState";

const Header = () => {
  const { data: session } = useSession();

  const router = useRouter();

  const state = useContext(GlobalContext);

  return (
    <div className="shadow-sm border-b bg-white sticky top-0 z-50">
      <div className="flex justify-between max-w-6xl mx-5 xl:mx-auto">
        {/* left  */}
        <div className="hidden relative w-28 md:inline-grid cursor-pointer">
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/2880px-Instagram_logo.svg.png"
            alt="Insta Logo"
            layout="fill"
            objectFit="contain"
            onClick={() => router.push("/")}
          />
        </div>
        <div className="relative w-10 md:hidden flex-shrink-0 cursor-pointer">
          <Image
            src="https://1000logos.net/wp-content/uploads/2017/02/insta-logo.png"
            alt="Insta Logo"
            layout="fill"
            objectFit="contain"
            onClick={() => router.push("/")}
          />
        </div>

        {/* Middle - Search Input field */}

        <div className="max-w-xs">
          <div className="relative mt-1 p-3 rounded-md">
            <div className="absolute inset-y-0 pl-3 flex items-center pointer-events-none">
              <VscSearch className="h-5 w-5 text-gray-500" />
            </div>
            <input
              type="text"
              placeholder="Search"
              className="bg-gray-50 block w-full pl-10 sm:text-sm border-gray-300 rounded-md focus:ring-black focus:border-black"
            />
          </div>
        </div>

        {/* Right  */}
        <div className="flex items-center justify-end space-x-4">
          <HiHome
            onClick={() => router.push("/")}
            size={25}
            className="navBtn"
          />
          <FiMenu size={25} className="h-6 md:hidden cursor-pointer" />

          {session ? (
            <>
              <div className="relative navBtn">
                <HiOutlinePaperAirplane
                  size={25}
                  className="navBtn rotate-45"
                />
                <div className="absolute -top-2 -right-2 text-xs w-5 h-5  bg-red-500 rounded-full flex items-center justify-center animate-pulse text-white">
                  3
                </div>
              </div>
              <AiOutlinePlusCircle
                size={25}
                className="navBtn"
                onClick={() => state.setModal(true)}
              />
              <HiUserGroup size={25} className="navBtn" />
              <AiOutlineHeart size={25} className="navBtn" />
              <img
                src={session.user.image}
                className="h-10 w-10 rounded-full object-cover cursor-pointer "
                onClick={() => signOut({ redirect: false })}
                alt=""
              />{" "}
            </>
          ) : (
            <button onClick={() => signIn()}>SignIn</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
