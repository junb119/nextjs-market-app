import useFavorite from "@/hooks/useFavorite";
import { User } from "@prisma/client";
import React from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

interface HeartButtonProps {
  productId: string;
  currentUser: User | null;
}
const HeartButton = ({ productId, currentUser }: HeartButtonProps) => {
  const { hasFavorite, toggleFavorite } = useFavorite({
    productId,
    currentUser,
  });
  return (
    <div className="relative transition cursor-pointer hover:opacity-80" onClick={toggleFavorite}>
      <AiOutlineHeart
        size={28}
        className="fill-white absolute -top-[2px] -right=[2px]"
      />
      <AiFillHeart
        size={24}
        className={hasFavorite ? `fill-rose-500` : "fill-neutral-500/70"}
      />
    </div>
  );
};

export default HeartButton;
