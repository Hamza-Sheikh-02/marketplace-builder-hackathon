import React from "react";
import Image from "next/legacy/image";
import ProductGrid from "@/components/ProductPageComponents/ProductGrid";

const ProductPage = () => {
  return (
    <div>
      <div className="relative w-full h-[209px]">
        <Image
          src="/allproducts.png"
          alt="All products"
          width={4000}
          height={425}
          style={{ objectFit: "cover" }}
          priority={true}
        />
      </div>
      <main className="pt-6">
        <ProductGrid />
      </main>
    </div>
  );
};

export default ProductPage;
