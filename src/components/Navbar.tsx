"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FiSearch, FiShoppingCart, FiMenu } from "react-icons/fi";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import { ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import ThemeButton from "@/components/theme-button";
import HeaderTop from "./HeaderTop";
import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";

const Navbar = () => {
  const [isCategoriesOpen, setCategoriesOpen] = useState(false);

  const cartItems = useSelector((state: RootState) => state.cart.items);

  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <>
      <HeaderTop />
      <nav className="w-full max-w-[1440px] mx-auto shadow-md">
        <div className="flex items-center justify-between px-6 md:px-10 py-4 border-b">
          <div>
            <Link href={"/"}>
              <h1 className="text-3xl font-bold">AVION</h1>
            </Link>
          </div>
          <div className="hidden md:flex">
            <ul className="flex items-center gap-8">
              <li>
                <Link href="/" className="hover:text-primary">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-primary">
                  About us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary">
                  Contact us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex items-center gap-4 ml-8">
            <Button aria-label="Search">
              <FiSearch className="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>

            <Link href="/shopping-cart" className="relative">
              <FiShoppingCart className="text-2xl cursor-pointer mr-2" />
              {totalQuantity > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-primary rounded-full">
                  {totalQuantity}
                </span>
              )}
            </Link>

            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
            <ThemeButton />
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  className="block md:hidden ml-auto"
                  aria-label="Open Mobile Menu"
                >
                  <FiMenu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle className="text-xl font-bold">Menu</SheetTitle>
                </SheetHeader>
                <ul className="flex flex-col gap-4 p-4">
                  <li>
                    <Link href="/" className="hover:text-primary">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link href="/about" className="hover:text-primary">
                      About us
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="hover:text-primary">
                      Contact us
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="hover:text-primary">
                      Blog
                    </Link>
                  </li>
                  <Collapsible
                    open={isCategoriesOpen}
                    onOpenChange={setCategoriesOpen}
                  >
                    <CollapsibleTrigger asChild>
                      <Button
                        className="flex items-center gap-2 text-left font-medium"
                        aria-expanded={isCategoriesOpen}
                      >
                        Categories
                        <ChevronsUpDown className="h-4 w-4" />
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent>
                      <ul className="flex flex-col gap-2 mt-2">
                        <li>
                          <Link href="/products" className="hover:text-primary">
                            All products
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/products/plant-pots"
                            className="hover:text-primary"
                          >
                            Plant pots
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/products/ceramics"
                            className="hover:text-primary"
                          >
                            Ceramics
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/products/tables"
                            className="hover:text-primary"
                          >
                            Tables
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/products/chairs"
                            className="hover:text-primary"
                          >
                            Chairs
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/products/crockory"
                            className="hover:text-primary"
                          >
                            Crockery
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/products/tableware"
                            className="hover:text-primary"
                          >
                            Tableware
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/products/cutlery"
                            className="hover:text-primary"
                          >
                            Cutlery
                          </Link>
                        </li>
                      </ul>
                    </CollapsibleContent>
                  </Collapsible>
                </ul>
              </SheetContent>
            </Sheet>
          </div>
        </div>
        <div className="bg-gray-100 dark:bg-gray-900 hidden sm:block">
          <ul className="flex flex-wrap justify-center gap-6 py-3">
            <li>
              <Link href="/products" className="hover:text-primary">
                All products
              </Link>
            </li>
            <li>
              <Link href="/products/plant-pots" className="hover:text-primary">
                Plant pots
              </Link>
            </li>
            <li>
              <Link href="/products/ceramics" className="hover:text-primary">
                Ceramics
              </Link>
            </li>
            <li>
              <Link href="/products/tables" className="hover:text-primary">
                Tables
              </Link>
            </li>
            <li>
              <Link href="/products/chairs" className="hover:text-primary">
                Chairs
              </Link>
            </li>
            <li>
              <Link href="/products/crockory" className="hover:text-primary">
                Crockery
              </Link>
            </li>
            <li>
              <Link href="/products/tableware" className="hover:text-primary">
                Tableware
              </Link>
            </li>
            <li>
              <Link href="/products/cutlery" className="hover:text-primary">
                Cutlery
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
