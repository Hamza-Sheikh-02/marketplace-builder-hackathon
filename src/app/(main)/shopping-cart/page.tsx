import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

const ShoppingCart: React.FC = () => {
  const hasItems = false;

  return (
    <div className="py-10 px-6 md:py-16 md:px-12 flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="max-w-[1440px] w-full">
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-xl md:text-3xl font-semibold text-gray-800 dark:text-gray-200">
              Your Shopping Cart
            </CardTitle>
          </CardHeader>
          <CardContent>
            {hasItems ? (
              <div className="space-y-4"></div>
            ) : (
              <div className="flex items-center justify-center py-16">
                <p className="text-lg font-medium text-gray-600 dark:text-gray-400">
                  No items added to your cart yet.
                </p>
              </div>
            )}
            <Separator className="my-6" />
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Subtotal
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                  £0
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Shipping
                </p>
                <p className="text-sm font-medium text-gray-800 dark:text-gray-200">
                  Calculated at checkout
                </p>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <p className="text-base font-medium text-gray-800 dark:text-gray-200">
                  Total
                </p>
                <p className="text-base font-bold text-gray-800 dark:text-gray-200">
                  £0
                </p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              disabled
              className="w-full bg-gray-300 text-gray-500 dark:bg-gray-700 dark:text-gray-400 cursor-not-allowed"
            >
              Go to Checkout
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default ShoppingCart;
