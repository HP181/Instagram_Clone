import Head from "next/head";
import Image from "next/image";
import Feed from "../components/Feed";
import Header from "../components/Header";
import Modal from "../components/Modal";

export default function Home() {
  return (
    <div className="bg-gray-50 h-screen overflow-y-scroll scrollbar-hide">
      <Head>
        <title>Instagram Clone</title>
      </Head>

      <Header />
      <Feed />
      <Modal />
    </div>
  );
}
