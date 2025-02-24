import getProducts, { productParams } from "../actions/getProducts";

interface HomeProps {
  searchParams: productParams;
}
export default async function Home({ searchParams }: HomeProps) {
  const products = await getProducts(searchParams);
  console.log("@@products", products);
  return <main>누구나 볼 수 있는 페이지입니다.</main>;
}
