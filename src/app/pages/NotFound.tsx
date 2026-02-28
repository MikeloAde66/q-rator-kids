import { Link } from "react-router";
import { Home, Palette } from "lucide-react";
import { Button } from "../components/ui/button";

export function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center space-y-6">
        <Palette className="w-24 h-24 mx-auto text-purple-300" />
        <h1 className="text-6xl font-bold text-gray-800">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700">
          Oops! This page got lost in the Renaissance
        </h2>
        <p className="text-gray-600 max-w-md mx-auto">
          Even the greatest artists make mistakes! Let's get you back to creating art.
        </p>
        <Link to="/">
          <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 gap-2">
            <Home className="w-5 h-5" />
            Go Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
