import React from "react";
import { FaChevronDown } from "react-icons/fa";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

const FilterBar: React.FC = () => {
  return (
    <div className="bg-gray-100 dark:text-white dark:bg-gray-800 shadow-md h-[96px] sm:h-[64px] w-full max-w-[1440px] mx-auto rounded-md flex items-center justify-between px-4 sm:px-6 md:px-10">
      <div className="hidden sm:flex space-x-6">
        {["Category", "Product type", "Price", "Brand"].map((filter) => (
          <div key={filter} className="relative flex items-center space-x-2">
            <button className="text-sm font-medium text-gray-600 dark:text-white hover:text-gray-900">
              {filter}
            </button>
            <FaChevronDown className="text-gray-500 dark:text-white text-xs" />
          </div>
        ))}
      </div>

      <div className="hidden sm:flex items-center space-x-4">
        <span className="text-sm font-medium text-gray-500 dark:text-white">
          Sorting by:
        </span>
        <div className="relative flex items-center space-x-2">
          <button className="text-sm font-medium text-gray-600 dark:text-white hover:text-gray-900">
            Date added
          </button>
          <FaChevronDown className="text-gray-500 dark:text-white text-xs" />
        </div>
      </div>

      <div className="sm:hidden flex w-full justify-between">
        <Dialog>
          <DialogTrigger asChild>
            <button className="flex items-center space-x-2 text-sm font-medium text-gray-600 hover:text-gray-900 bg-gray-100 dark:text-white px-4 py-2 rounded-lg">
              <span>Filters</span>
              <FaChevronDown className="text-gray-500 dark:text-white text-xs" />
            </button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle className="sr-only">Filters</DialogTitle>
            <div className="flex flex-col space-y-6">
              {["Category", "Product type", "Price", "Brand"].map((filter) => (
                <div
                  key={filter}
                  className="relative flex items-center space-x-2"
                >
                  <button className="text-sm font-medium text-gray-600 dark:text-white hover:text-gray-900">
                    {filter}
                  </button>
                  <FaChevronDown className="text-gray-500 dark:text-white text-xs" />
                </div>
              ))}
            </div>
          </DialogContent>
        </Dialog>

        <Dialog>
          <DialogTrigger asChild>
            <button className="flex items-center space-x-2 text-sm font-medium text-gray-600 hover:text-gray-900 bg-gray-100 dark:text-white px-4 py-2 rounded-lg">
              <span>Sorting</span>
              <FaChevronDown className="text-gray-500 dark:text-white text-xs" />
            </button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle className="sr-only">Sorting</DialogTitle>
            <div className="flex flex-col space-y-6">
              <div className="relative flex items-center space-x-4">
                <span className="text-sm font-medium text-gray-500 dark:text-white">
                  Sorting by:
                </span>
                <div className="flex items-center space-x-2">
                  <button className="text-sm font-medium text-gray-600 dark:text-white hover:text-gray-900">
                    Date added
                  </button>
                  <FaChevronDown className="text-gray-500 dark:text-white text-xs" />
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default FilterBar;
