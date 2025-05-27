import type { ProductWithImages } from "@/interfaces";
import { ProductCard } from "@/components";

interface Props {
  products: ProductWithImages[];
}

export const ProductList = ({ products }: Props) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 place-items-center">
      { 
        products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))
      }
    </div>
  );
}