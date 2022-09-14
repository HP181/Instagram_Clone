import React, { Fragment, useContext, useRef, useState } from "react";
import { BsFillCameraFill } from "react-icons/bs";
import { GlobalContext } from "../pages/Context/GlobalState";
import { Dialog, Transition } from "@headlessui/react";
import { SpinnerDotted } from "spinners-react";
import { db, storage } from "../Firebase";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { useSession } from "next-auth/react";
import { ref, uploadString, getDownloadURL } from "firebase/storage";

const Modal = () => {
  const [Loading, setLoading] = useState(false);
  const state = useContext(GlobalContext);
  const [selectedFile, setSelectedFile] = useState(null);
  const filePicker = useRef(null);
  const captionRef = useRef(null);
  const { data: session } = useSession();

  const addImageToPost = (e) => {
    const reader = new FileReader();

    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    };
  };

  //   UPLOAD TO FIREBASE

  const uploadPost = async () => {
    if (Loading) return;

    setLoading(true);

    // 1)  create a post and add to Firestore -> post BiCollection
    const docRef = await addDoc(collection(db, "posts"), {
      username: session.user.name,
      caption: captionRef.current.value,
      profileImg: session.user.image,
      timestamp: serverTimestamp(),
    });

    // 2)  get the postId for newly created post

    // 3)  upload image to firebase storage with postId
    const imageRef = ref(storage, `posts/${docRef.id}/image`);

    await uploadString(imageRef, selectedFile, "data_url").then(
      async (snapshot) => {
        const downloadURL = await getDownloadURL(imageRef);

        // 4)  get the download URL from firebase storage and update the original post with image
        await updateDoc(doc(db, "posts", docRef.id), {
          image: downloadURL,
        });
      }
    );

    state.setModal(false);
    setLoading(false);
    setSelectedFile(null);
  };

  return (
    <Transition.Root show={state.Modal} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={() => state.setModal(false)}
      >
        <div className="flex items-end justify-center min-h-[800px] sm:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
              <div>
                {selectedFile ? (
                  <img
                    src={selectedFile}
                    onClick={() => setSelectedFile(null)}
                    className="w-full h-[15em] object-contain cursor-pointer rounded-lg border-none"
                    alt="Post image"
                  />
                ) : (
                  <div
                    onClick={() => filePicker.current.click()}
                    className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-200 cursor-pointer"
                  >
                    <BsFillCameraFill size={25} className="w-6" aria-hidden />
                  </div>
                )}

                <div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-lg leading-6 font-medium text-gray-900"
                    >
                      {" "}
                      Upload a photo
                    </Dialog.Title>

                    <div>
                      <input
                        type="file"
                        hidden
                        ref={filePicker}
                        onChange={addImageToPost}
                      />
                    </div>

                    <div className="mt-2">
                      <input
                        type="text"
                        ref={captionRef}
                        className="border-none focus:ring-0 w-full text-center"
                        placeholder="Enter Your Caption"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-5 sm:mt-6">
                  <button
                    type="button"
                    disabled={!selectedFile || Loading}
                    onClick={uploadPost}
                    className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm disabled:bg-gray-300 disabled:cursor-not-allowed hover:disabled:bg-gray-300 "
                  >
                    {Loading ? (
                      <SpinnerDotted
                        size={31}
                        thickness={163}
                        speed={97}
                        color="rgba(255,0,0, 0.8)"
                      />
                    ) : (
                      "Upload Post"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Modal;
