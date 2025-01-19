"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const AboutHeroSection = () => {
  return (
    <section
      className="relative w-full bg-background flex items-center justify-center"
      style={{ minHeight: "277px" }}
    >
      <div className="max-w-[1440px] w-full flex flex-col md:flex-row justify-between items-center px-6 md:px-10 py-8 md:py-12 mx-auto">
        <div className="text-center md:text-left">
          <h2 className="text-xl md:text-2xl font-light text-foreground leading-relaxed max-w-[600px]">
            A brand built on the love of craftsmanship, quality, and outstanding
            customer service
          </h2>
        </div>

        <div className="mt-6 md:mt-0">
          <Link href={"/products"}>
            <Button
              variant="outline"
              className="px-6 py-3 text-sm text-wite bg-primary hover:bg-primary/80"
            >
              View our products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AboutHeroSection;
