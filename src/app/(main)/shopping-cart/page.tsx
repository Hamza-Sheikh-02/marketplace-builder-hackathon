"use client";

import React, { useState } from "react";
import { remove } from "@/app/redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import Image from "next/image";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Trash } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";
import { MdDelete } from "react-icons/md";

interface CartItem {
  id: string;
  title: string;
  description?: string;
  price: number;
  image: string;
  quantity: number;
}

const CartPage: React.FC = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);

  const openDeleteDialog = (id: string) => {
    setItemToDelete(id);
    setDialogOpen(true);
  };

  const confirmDelete = () => {
    if (itemToDelete) {
      dispatch(remove(itemToDelete));
      setItemToDelete(null);
    }
    setDialogOpen(false);
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="py-10 px-6 md:py-16 md:px-12 flex items-center justify-center">
      <div className="max-w-[1440px] w-full">
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-xl md:text-3xl font-semibold text-gray-800 dark:text-gray-200">
              Your Shopping Cart
            </CardTitle>
          </CardHeader>

          <CardContent>
            {cartItems.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead className="text-right">Quantity</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cartItems.map((item: CartItem) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <div className="flex items-center space-x-4">
                          <Image
                            src={item.image}
                            alt={item.title}
                            height={50}
                            width={50}
                            className="rounded-md"
                          />
                          <div>
                            <h5 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                              {item.title}
                            </h5>
                            <p className="text-xs text-ellipsis overflow-hidden text-gray-600 line-clamp-1 dark:text-gray-400 mt-1">
                              {item.description?.split(". ")[0] || ""}.
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        {item.quantity}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <span>
                            £{(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-end space-x-2">
                          <Trash
                            className="text-red-500 cursor-pointer hover:text-red-600"
                            onClick={() => openDeleteDialog(item.id)}
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
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
                  £{totalPrice.toFixed(2)}
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
                  £{totalPrice.toFixed(2)}
                </p>
              </div>
            </div>
          </CardContent>

          <CardFooter>
            <Button
              className="w-full bg-primary text-white hover:bg-primary/80"
              disabled={cartItems.length === 0}
            >
              {cartItems.length > 0
                ? "Proceed to Checkout"
                : "Your cart is empty"}
            </Button>
          </CardFooter>
        </Card>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                Are you sure you want to Remove this item?
              </DialogTitle>
            </DialogHeader>
            <DialogFooter>
              <Button variant="secondary" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={() => {
                  confirmDelete();
                  toast("Item Has Been Successfully Removed", {
                    icon: <MdDelete />,
                  });
                }}
              >
                Remove
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default CartPage;
