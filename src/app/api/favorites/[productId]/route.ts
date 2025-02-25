import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";

interface Params {
  productId?: string;
}
export async function POST(request: Request, { params }: { parmas: Params }) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.error();
  }
  const { productId } = params;
  if (!productId || typeof productId !== "string") {
    throw new Error("Invalid ID");
  }
  const favoritedIds = [...(currentUser.favoriteIds || [])];
  favoritedIds.push(productId);

  const user = await prisma?.user.update({
    where: { id: currentUser.id },
    data: {
      favoriteIds: favoritedIds,
    },
  });
  return NextResponse.json(user);
}

export async function DELETE(request: Request, { params }: { parmas: Params }) {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.error();
  }
  const { productId } = params;
  if (!productId || typeof productId !== "string") {
    throw new Error("Invalid ID");
  }
  let favoritedIds = [...(currentUser.favoriteIds || [])];
  favoritedIds = favoritedIds.filter(id => id !== productId);

  const user = await prisma?.user.update({
    where: { id: currentUser.id },
    data: {
      favoriteIds: favoritedIds,
    },
  });
  return NextResponse.json(user);
}

