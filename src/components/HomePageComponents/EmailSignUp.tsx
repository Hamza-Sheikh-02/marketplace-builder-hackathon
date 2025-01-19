"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

const EmailSignUp = () => {
  const [exclusiveOffers, setExclusiveOffers] = useState(false);
  const [freeEvents, setFreeEvents] = useState(false);
  const [largeDiscounts, setLargeDiscounts] = useState(false);

  return (
    <div
      className="relative flex justify-center items-center h-[370px] sm:h-[444px] bg-cover bg-center"
      style={{
        backgroundImage: "url('/emailsignup.png')",
      }}
    >
      <div className="absolute inset-0 bg-black/30"></div>

      <div className="relative text-center text-white max-w-[90%] sm:max-w-3xl mx-auto px-4 sm:px-6">
        <h1 className="text-xl sm:text-3xl font-semibold mb-3 sm:mb-4 leading-tight sm:leading-snug">
          Join the club and get the benefits
        </h1>
        <p className="text-sm sm:text-lg mb-5 sm:mb-6 leading-relaxed">
          Sign up for our newsletter and receive exclusive offers on new ranges,
          sales, pop-up stores, and more.
        </p>

        <div className="flex flex-col sm:flex-row sm:justify-center gap-3 sm:gap-4 text-xs sm:text-sm mb-4 sm:mb-6">
          <label className="flex items-center space-x-2">
            <Checkbox
              checked={exclusiveOffers}
              onCheckedChange={(checked) =>
                setExclusiveOffers(checked === true)
              }
            />
            <span>Exclusive offers</span>
          </label>
          <label className="flex items-center space-x-2">
            <Checkbox
              checked={freeEvents}
              onCheckedChange={(checked) => setFreeEvents(checked === true)}
            />
            <span>Free events</span>
          </label>
          <label className="flex items-center space-x-2">
            <Checkbox
              checked={largeDiscounts}
              onCheckedChange={(checked) => setLargeDiscounts(checked === true)}
            />
            <span>Large discounts</span>
          </label>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center">
          <Input
            type="email"
            placeholder="your@email.com"
            className="w-full sm:w-[300px] mb-3 sm:mb-0 sm:rounded-none sm:rounded-l-md"
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
  );
};

export default EmailSignUp;
