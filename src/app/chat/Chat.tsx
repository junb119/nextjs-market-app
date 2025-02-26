import { TConversation, TUserWithChat } from "@/types";
import React from "react";
import Input from "./Input";
import { User } from "@prisma/client";
import ChatHeader from "./ChatHeader";

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
  const conversation: TConversation | undefined =
    currentUser?.conversations.find((conversation: TConversation) =>
      conversation.users.find((user: User) => user.id === receiver.receiverId)
    );
  if (!receiver.receiverName || !currentUser)
    return <div className="w-full h-full"></div>;
  return (
    <div className="w-full">
      <div>
        <ChatHeader
          setLayout={setLayout}
          receiverName={receiver.receiverName}
          receiverImage={receiver.receiverImage}
          lastMessageTime={
            conversation?.messages
              .filter((message) => message.receiverId === currentUser.id)
              .slice(-1)[0]?.createdAt
          }
        />
      </div>
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
