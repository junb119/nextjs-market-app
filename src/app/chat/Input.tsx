"use client";
import previewImage from "@/helpers/previewImage";
import uploadImage from "@/helpers/uploadImage";
import axios from "axios";
import { url } from "inspector";
import React, { FormEvent, useRef, useState } from "react";
import { CgClose } from "react-icons/cg";
import { IoImageOutline } from "react-icons/io5";
import { RiSendPlaneLine } from "react-icons/ri";
import useSWRMutation from "swr/mutation";

interface InputProps {
  receiverId: string;
  currentUserId: string;
}

const sendRequest = (
  url: string,
  {
    arg,
  }: {
    arg: { text: string; image: string; receiverId: string; senderId: string };
  }
) => {
  return fetch(url, { method: "POST", body: JSON.stringify(arg) }).then((res) =>
    res.json()
  );
};
const Input = ({ receiverId, currentUserId }: InputProps) => {
  const [message, setMessage] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const imageRef = useRef<HTMLInputElement>(null);

  const { trigger } = useSWRMutation("/api/chat", sendRequest);

  const chooseImage = () => {
    imageRef.current?.click();
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const imgUrl = image ? await uploadImage(image as File) : null;

    if (message || imgUrl) {
      try {
        trigger({
          text: message,
          image: imgUrl,
          receiverId: receiverId,
          senderId: currentUserId,
        });
        // await axios.post("/api/chat", {
        //   text: message,
        //   image: imgUrl,
        //   receiverId: receiverId,
        //   senderId: currentUserId,
        // });
      } catch (error) {
        console.error(error);
      }
    }
    setMessage("");
    setImage(null);
    setImagePreview(null);
  };
  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
  };
  return (
    <form
      className="relative flex items-center justify-between w-full gap-4 p-2 pl-4 border-[1px] border-gray-300 rounded-md shadow-sm"
      onSubmit={handleSubmit}
    >
      {imagePreview && (
        <div className="absolute right-0 w-full overflow-hidden rounded-md bottom-[4.2rem] max-w-[300px] shadow-md">
          <img src={imagePreview} alt="" />
          <span
            onClick={removeImage}
            className="absolute flex items-center justify-center p-2 text-xl text-white bg-gray-900 cursor-pointer top-[0.4rem] right-[0.4rem] rounded-full opacity-60 hover:opacity-100"
          >
            <CgClose />
          </span>
        </div>
      )}
      <input
        className="w-full text-base outline-none"
        type="text"
        placeholder="메시지를 입력해주세요."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <input
        type="file"
        className="hidden"
        ref={imageRef}
        accept="image/*"
        multiple={false}
        onChange={(e) => previewImage(e, setImagePreview, setImage)}
      />

      <div
        onClick={chooseImage}
        className="text-2xl text-gray-200 cursor-pointer"
      >
        <IoImageOutline />
      </div>
      <button
        type="submit"
        className="flex items-center justify-center p-2 text-xl text-gray-900 bg-orange-500 rounded-lg cursor-pointer hover:bg-orange-600 disabled:opacity-60"
      >
        <RiSendPlaneLine className="text-white" />
      </button>
    </form>
  );
};

export default Input;
