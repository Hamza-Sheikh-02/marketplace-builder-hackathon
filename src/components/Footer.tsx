"use client";

import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaSkype,
  FaLinkedinIn,
  FaPinterest,
} from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

const Footer = () => {
  return (
    <footer className="bg-[rgb(42,37,75)] text-white px-4 md:px-16 lg:px-32 py-10">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
        <div>
          <h2 className="font-bold mb-4 text-lg">Menu</h2>
          <ul className="space-y-2 text-sm">
            <li>New arrivals</li>
            <li>Best sellers</li>
            <li>Recently viewed</li>
            <li>Popular this week</li>
            <li>All products</li>
          </ul>
        </div>

        <div>
          <h2 className="font-bold mb-4 text-lg">Categories</h2>
          <ul className="space-y-2 text-sm">
            <li>Crockery</li>
            <li>Furniture</li>
            <li>Homeware</li>
            <li>Plant pots</li>
            <li>Chairs</li>
            <li>Crockery</li>
          </ul>
        </div>

        <div>
          <h2 className="font-bold mb-4 text-lg">Our Company</h2>
          <ul className="space-y-2 text-sm">
            <li>About us</li>
            <li>Vacancies</li>
            <li>Contact us</li>
            <li>Privacy</li>
            <li>Returns policy</li>
          </ul>
        </div>

        <div>
          <h2 className="font-bold mb-4 text-lg">Join our mailing list</h2>
          <div className="flex items-center gap-2">
            <Input
              type="email"
              placeholder="your@email.com"
              className="bg-gray-600 text-white placeholder-white"
            />
            <Button
              className="text-primary bg-white"
              variant="outline"
              onClick={() =>
                toast("You have Been sign up successfully!", {
                  description: "Sunday, January 19, 2025 at 1:15 PM",
                })
              }
            >
              Sign Up
            </Button>
          </div>
        </div>
      </div>

      <Separator className="border-gray-600 my-4" />

      <div className="flex flex-col-reverse md:flex-row justify-between items-center mt-4">
        <div className="text-sm text-center md:text-left mt-4 md:mt-0">
          Copyright © 2025 Avion
        </div>

        <div className="flex justify-center space-x-6">
          <a
            href="https://www.linkedin.com/in/hamza-sheikh-351766298/"
            aria-label="LinkedIn"
            className="hover:text-gray-300"
          >
            <FaLinkedinIn size={20} />
          </a>
          <a
            href="https://www.linkedin.com/in/hamza-sheikh-351766298/"
            aria-label="Facebook"
            className="hover:text-gray-300"
          >
            <FaFacebookF size={20} />
          </a>
          <a
            href="https://www.linkedin.com/in/hamza-sheikh-351766298/"
            aria-label="Instagram"
            className="hover:text-gray-300"
          >
            <FaInstagram size={20} />
          </a>
          <a
            href="https://www.linkedin.com/in/hamza-sheikh-351766298/"
            aria-label="Skype"
            className="hover:text-gray-300"
          >
            <FaSkype size={20} />
          </a>
          <a
            href="https://www.linkedin.com/in/hamza-sheikh-351766298/"
            aria-label="Twitter"
            className="hover:text-gray-300"
          >
            <FaTwitter size={20} />
          </a>
          <a
            href="https://www.linkedin.com/in/hamza-sheikh-351766298/"
            aria-label="Pinterest"
            className="hover:text-gray-300"
          >
            <FaPinterest size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
