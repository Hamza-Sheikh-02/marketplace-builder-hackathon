"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

const AboutNewsletterSection = () => {
  return (
    <div className="py-10 px-6 md:py-16 md:px-12 flex items-center justify-center">
      <Card className="max-w-[1273px] w-full text-center px-8 md:px-14 py-8 md:py-12 rounded-lg shadow-sm">
        <CardHeader>
          <CardTitle className="text-xl md:text-3xl font-semibold mb-4">
            Join the club and get the benefits
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm md:text-base text-muted-foreground mb-6">
            Sign up for our newsletter and receive exclusive offers on new
            ranges, sales, pop-up stores, and more.
          </p>
          <form className="flex flex-col md:flex-row justify-center items-center max-w-[600px] mx-auto">
            <Input
              type="email"
              placeholder="your@email.com"
              className="w-full md:w-[70%] mb-4 md:mb-0 md:mr-4"
            />
            <Button
              className="text-wite bg-primary hover:bg-primary/80"
              variant="outline"
              onClick={() =>
                toast("You have Been sign up successfully!", {
                  description: "Sunday, January 19, 2025 at 1:15 PM",
                })
              }
            >
              Sign Up
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AboutNewsletterSection;
