import prisma from "@/helpers/prismadb";
interface Params {
  productId?: string;
}
export default async function getProductById(parmas: Params) {
  try {
    const { productId } = parmas;
    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: { user: true },
    });
    if (!product) return null;
    return product;
  } catch (error: any) {
    throw new Error(error);
  }
}
