import React from "react";
import Image from "next/image";
import FilterBar from "@/components/ProductPageComponents/FilterBar";
import ProductGrid from "@/components/ProductPageComponents/ProductGrid";

const ProductPage: React.FC = () => {
  return (
    <div>
      <div className="relative w-full h-[209px]">
        <Image
          src="/allproducts.png"
          alt="All products"
          fill
          style={{ objectFit: "cover" }}
          priority={true}
        />
      </div>

      <main className="pt-4">
        <FilterBar />
      </main>

      <main className="pt-6">
        <ProductGrid />
      </main>
    </div>
  );
};

export default ProductPage;
