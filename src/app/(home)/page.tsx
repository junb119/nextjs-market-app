import Container from "@/components/Container";
import getProducts, { productParams } from "../actions/getProducts";
import EmptyState from "@/components/EmptyState";
import ProductCard from "@/components/ProductCard";
import getCurrentUser from "../actions/getCurrentUser";
import FloatingButton from "@/components/FloatingButton";
import Categories from "@/components/categories/Categories";
import Pagination from "@/components/Pagination";
import { PRODUCT_PER_PAGE } from "@/constants";

interface HomeProps {
  searchParams: productParams;
}
export default async function Home({ searchParams }: HomeProps) {
  const page = searchParams?.page;
  // console.log("page@@@@@@@@@@", page);
  const pageNum = typeof page === "string" ? Number(page) : 1;
  console.log("pageNum", pageNum);
  const products = await getProducts(searchParams);
  const currentUser = await getCurrentUser();
  console.log("@@products", products);
  return (
    <Container>
      <Categories />
      {products?.data.length === 0 ? (
        <EmptyState showReset />
      ) : (
        <>
          <div className="grid grid-cols-1 gap-8 pt-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6">
            {products.data.map((product) => (
              <ProductCard
                key={product.id}
                currentUser={currentUser}
                data={product}
              />
            ))}
          </div>
        </>
      )}
      <Pagination
        page={pageNum}
        totalItems={products.totalItems}
        perPage={PRODUCT_PER_PAGE}
      />
      <FloatingButton href="/products/upload">+</FloatingButton>
    </Container>
  );
}
