"use client";
import Link from "next/link";

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-white dark:bg-black text-foreground dark:text-primary">
      <div className="text-center p-8 bg-card dark:bg-secondary shadow-lg rounded-xl max-w-lg w-full">
        <h1 className="text-6xl font-bold text-primary">404</h1>
        <p className="text-xl text-muted-foreground mt-4">
          Oops! The page you are looking for does not exist.
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          It might have been moved, deleted, or never existed.
        </p>

        <Link href="/">
          <button className="mt-6 px-6 py-3 text-white bg-primary rounded-full shadow-md hover:bg-primary/80 transition duration-300">
            Go Back Home
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
