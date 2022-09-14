import React from "react";
import { getProviders, signIn as SignIntoProvider } from "next-auth/react";
import Header from "../../components/Header";

const signIn = ({ providers }) => {
  return (
    <>
      <Header />

      <div className="flex flex-col items-center justify-center min-h-screen py-2 -mt-24 px-14 text-center">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/2880px-Instagram_logo.svg.png"
          className="w-80"
          alt=""
        />
        <p>
          THIS IS NOT A REAL APP, IT&apos;S JUST BUILT FOR LEARNING PURPOSE
          ONLY!!!
        </p>

        <div className="mt-20">
          {Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <button
                className="p-3 bg-blue-600 rounded-lg text-white"
                onClick={() =>
                  SignIntoProvider(provider.id, { callbackUrl: "/" })
                }
              >
                Sign In With {provider.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default signIn;

export async function getServerSideProps(context) {
  const providers = await getProviders();

  return {
    props: { providers }, // will be passed to the page component as props
  };
}
