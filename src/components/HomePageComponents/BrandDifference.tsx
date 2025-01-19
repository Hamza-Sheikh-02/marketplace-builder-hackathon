import React from "react";
import {
  FaShippingFast,
  FaHandHoldingHeart,
  FaTag,
  FaRecycle,
} from "react-icons/fa";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const BrandDifference = () => {
  return (
    <div className="bg-background flex flex-col items-center justify-center px-6 py-12">
      <h2 className="text-2xl font-semibold text-foreground mb-12 text-center">
        What makes our brand different
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-[1440px] w-full">
        {/* Next Day Shipping */}
        <Card className="bg-card shadow-md">
          <CardHeader className="flex flex-col items-center text-center">
            <FaShippingFast className="text-4xl text-primary mb-4" />
            <CardTitle className="text-lg font-semibold text-foreground">
              Next day as standard
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Order before 3pm and get your order the next day as standard
            </p>
          </CardContent>
        </Card>

        {/* Made by Artisans */}
        <Card className="bg-card shadow-md">
          <CardHeader className="flex flex-col items-center text-center">
            <FaHandHoldingHeart className="text-4xl text-primary mb-4" />
            <CardTitle className="text-lg font-semibold text-foreground">
              Made by true artisans
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Handmade crafted goods made with real passion and craftsmanship
            </p>
          </CardContent>
        </Card>

        {/* Unbeatable Prices */}
        <Card className="bg-card shadow-md">
          <CardHeader className="flex flex-col items-center text-center">
            <FaTag className="text-4xl text-primary mb-4" />
            <CardTitle className="text-lg font-semibold text-foreground">
              Unbeatable prices
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              For our materials and quality, you won’t find better prices
              anywhere
            </p>
          </CardContent>
        </Card>

        {/* Recycled Packaging */}
        <Card className="bg-card shadow-md">
          <CardHeader className="flex flex-col items-center text-center">
            <FaRecycle className="text-4xl text-primary mb-4" />
            <CardTitle className="text-lg font-semibold text-foreground">
              Recycled packaging
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              We use 100% recycled to ensure our footprint is more manageable
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BrandDifference;
