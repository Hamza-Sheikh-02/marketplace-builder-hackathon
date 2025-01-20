/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/legacy/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDispatch } from "react-redux";
import { addToCart } from "@/app/redux/cartSlice";
import BestSelling from "@/components/HomePageComponents/BestSelling";
import AboutNewsletterSection from "@/components/AboutPageComponents/NewsletterSection";
import { toast } from "sonner";
import { IoAddCircle } from "react-icons/io5";

async function fetchProductBySlug(slug: string) {
  const query = `*[_type == "product" && slug.current == $slug][0]{
    name,
    price,
    image,
    description,
    quantity,
    dimensions,
    "slug": slug.current
  }`;

  const product = await client.fetch(query, { slug });
  return product;
}

const ProductPage = () => {
  const params = useParams();
  const slug = params.slug as string;

  const [product, setProduct] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [quantity, setQuantity] = useState<number>(1);

  const dispatch = useDispatch();

  useEffect(() => {
    const loadProduct = async () => {
      if (slug) {
        const fetchedProduct = await fetchProductBySlug(slug);
        setProduct(fetchedProduct);
        setLoading(false);
      }
    };

    loadProduct();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-gray-600">Loading product...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-gray-600">Product not found.</p>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (product) {
      const cartItem = {
        id: product.slug,
        title: product.name,
        description: product.description,
        price: product.price,
        image: urlFor(product.image).url(),
        quantity,
      };
      dispatch(addToCart(cartItem));
    }
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center lg:justify-between max-w-[1440px] mx-auto p-4 lg:p-8">
        <div className="w-full lg:w-1/2 flex justify-center">
          <Image
            src={urlFor(product.image).url()}
            width={500}
            height={650}
            alt={product.name}
            className="object-cover w-full h-auto lg:h-[600px] max-h-[600px] rounded-md"
          />
        </div>

        <div className="w-full lg:w-1/2 text-center lg:text-left space-y-6 mt-6 lg:mt-0">
          <h1 className="text-3xl lg:text-4xl font-semibold">{product.name}</h1>
          <p className="text-2xl text-gray-600 dark:text-gray-300 font-medium">
            £{product.price.toFixed(2)}
          </p>

          <p className="text-gray-700 dark:text-gray-400">
            {product.description}
          </p>

          {product.dimensions && (
            <div className="space-y-2">
              <p className="font-medium">Dimensions</p>
              <div className="flex justify-center lg:justify-start space-x-8">
                <div>
                  <p className="font-semibold">Height</p>
                  <p>{product.dimensions.height}</p>
                </div>
                <div>
                  <p className="font-semibold">Width</p>
                  <p>{product.dimensions.width}</p>
                </div>
                <div>
                  <p className="font-semibold">Depth</p>
                  <p>{product.dimensions.depth}</p>
                </div>
              </div>
            </div>
          )}

          <div className="flex items-center justify-center lg:justify-start space-x-4">
            <label htmlFor="quantity" className="font-medium">
              Quantity:
            </label>
            <Input
              type="number"
              id="quantity"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              className="w-16 border border-gray-300 rounded-md text-center"
            />
          </div>
          <Button
            onClick={() => {
              handleAddToCart();
              toast("Item Has Been Successfully Added", {
                icon: <IoAddCircle />,
              });
            }}
            className="bg-primary hover:bg-primary/80 text-white py-3 px-6 rounded-lg transition"
          >
            Add to cart
          </Button>
        </div>
      </div>
      <BestSelling />
      <AboutNewsletterSection />
    </>
  );
};

export default ProductPage;
