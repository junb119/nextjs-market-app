import { TUserWithChat } from "@/types";
import React from "react";
import Input from "./Input";

interface ChatProps {
  receiver: {
    receiverId: string;
    receiverName: string;
    receiverImage: string;
  };
  currentUser: TUserWithChat;
  setLayout: (layout: boolean) => void;
}
const Chat = ({ currentUser, receiver, setLayout }: ChatProps) => {
  if (!receiver.receiverName || !currentUser)
    return <div className="w-full h-full"></div>;
  return (
    <div className="w-full">
      <div>{/* Chat Header */}</div>
      <div className="flex flex-col gap-8 p-4 overflow-auto h-[calc(100vh_-_60px-70px_-_80px)]">
        {/* Chat Message */}
      </div>
      <div className="flex items-center p-3">
        <Input
          receiverId={receiver?.receiverId}
          currentUserId={currentUser?.id}
        />
      </div>
    </div>
  );
};

export default Chat;
