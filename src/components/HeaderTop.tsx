"use client";

import React, { useState } from "react";
import { FaTruck } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

const HeaderTop = () => {
  const [isVisible, setIsVisible] = useState(true);

  return (
    isVisible && (
      <div className="bg-[rgb(42,37,75)] text-white flex items-center justify-center px-4 py-2 text-xs sm:text-sm relative">
        <div className="flex items-center gap-2 text-center max-w-screen-md">
          <FaTruck className="text-white text-base sm:text-lg" />
          <span>
            Free delivery on all orders over £50 with code{" "}
            <strong>WELCOME30</strong> at checkout
          </span>
        </div>

        <button
          aria-label="Close announcement"
          onClick={() => setIsVisible(false)}
          className="absolute right-4 sm:right-8 text-white hover:text-gray-300"
        >
          <IoMdClose className="text-base sm:text-lg" />
        </button>
      </div>
    )
  );
};

export default HeaderTop;
