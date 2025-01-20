"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaChevronDown } from "react-icons/fa";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { client } from "@/sanity/lib/client";

async function fetchCategories() {
  const query = `*[_type == "category"]{name, "slug": slug.current}`;
  const categories = await client.fetch(query);
  return categories;
}

const FilterBar = ({
  onSortChange,
}: {
  onSortChange: (sortBy: string) => void;
}) => {
  const [categories, setCategories] = useState<
    { name: string; slug: string | null }[]
  >([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedSort, setSelectedSort] = useState<string>("Date added");
  const router = useRouter();

  useEffect(() => {
    const loadCategories = async () => {
      const fetchedCategories = await fetchCategories();
      setCategories(fetchedCategories);
    };

    loadCategories();
  }, []);

  const handleCategorySelect = (slug: string | null) => {
    if (slug) {
      router.push(`/products/${slug}`);
    } else {
      router.push("/products");
    }
  };

  const handleSortSelect = (sortBy: string) => {
    setSelectedSort(sortBy);
    onSortChange(sortBy);
  };

  return (
    <div className="bg-gray-100 dark:text-white dark:bg-gray-800 shadow-md h-auto sm:h-[64px] w-full max-w-[1440px] mx-auto rounded-md flex flex-col sm:flex-row items-center justify-between px-4 sm:px-6 md:px-10 py-2 sm:py-0 space-y-2 sm:space-y-0">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center space-x-2 text-sm font-medium text-gray-600 dark:text-white hover:text-gray-900 px-4 py-2 rounded-lg">
            <span>{selectedCategory || "All Categories"}</span>
            <FaChevronDown className="text-gray-500 dark:text-white text-xs" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem
            onClick={() => {
              setSelectedCategory(null);
              handleCategorySelect(null);
            }}
          >
            All Categories
          </DropdownMenuItem>
          {categories.map((category) => (
            <DropdownMenuItem
              key={category.slug || `fallback-${category.name}`}
              onClick={() => {
                setSelectedCategory(category.name);
                handleCategorySelect(category.slug);
              }}
            >
              {category.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="flex items-center space-x-4">
        <span className="text-sm font-medium text-gray-500 dark:text-white">
          Sorting by:
        </span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center space-x-2 text-sm font-medium text-gray-600 dark:text-white hover:text-gray-900 px-4 py-2 rounded-lg">
              <span>{selectedSort}</span>
              <FaChevronDown className="text-gray-500 dark:text-white text-xs" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => handleSortSelect("Date added")}>
              Date added
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleSortSelect("Price (Low to High)")}
            >
              Price (Low to High)
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => handleSortSelect("Price (High to Low)")}
            >
              Price (High to Low)
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default FilterBar;
