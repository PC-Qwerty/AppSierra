import React from "react";
import { Link } from "react-router-dom";
import { Home } from "lucide-react";
import { Button } from "../components/ui";
import { Footer, Header } from "../components/layout";

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <main className="flex-grow flex items-center justify-center py-16 px-4">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
          <p className="text-2xl font-medium text-gray-700 mb-8">
            Oops! The page you're looking for doesn't exist.
          </p>
          <p className="text-gray-600 mb-10 max-w-md mx-auto">
            The page you are looking for might have been removed, had its name
            changed, or is temporarily unavailable.
          </p>
          <Link to="/">
            <Button iconLeft={<Home size={18} />}>Back to Home</Button>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFound;
