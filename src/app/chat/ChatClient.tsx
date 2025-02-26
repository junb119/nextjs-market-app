"use client";
import { User } from "@prisma/client";
import axios from "axios";
import React, { useEffect, useState } from "react";
interface ChatClientProps {
  currentUser?: User | null;
}
const ChatClient = ({ currentUser }: ChatClientProps) => {
  const [receiver, setReceiver] = useState({
    receiverId: "",
    receiverName: "",
    receiverImage: "",
  });
  const [layout, setLayout] = useState(false);
  useEffect(() => {
    axios.get(`/api/chat`).then((res) => console.log(res));
  }, []);

  return (
    <main>
      <div className="grid grid-cols-[1fr] md:grid-cols-[300px_1fr]">
        {/* md 보다 클 때는 둘다 보여야 함  */}
        {/* md보다 작고 layout이 true 일 때는 contact 안보임  */}
        <section className={`md:flex ${layout && "hidden"}`}>
          Contact Comonent
        </section>
        {/* md 보다 클 때는 둘다 보여야 함  */}
        {/* md보다 작고 layout이 false 일 때는 chat 안보임  */}
        <section className={`md:flex ${!layout && "hidden"}`}>
          Chat Component
        </section>
      </div>
    </main>
  );
};

export default ChatClient;
