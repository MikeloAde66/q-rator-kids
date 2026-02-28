import { Link } from "react-router";
import { Image, ArrowRight, CheckCircle2 } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

export function AppStorePromoCard() {
  return (
    <Card className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-300 hover:border-blue-400 transition-all group">
      <div className="flex items-start gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-purple-500 p-3 rounded-2xl shrink-0 group-hover:scale-110 transition-transform">
          <Image className="w-6 h-6 text-white" />
        </div>
        
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-xl font-bold text-gray-800">App Store Assets</h3>
            <Badge className="bg-green-500 text-white">Ready</Badge>
          </div>
          
          <p className="text-gray-600 mb-4">
            Download marketing materials, screenshots, app icons, and promotional graphics for app store launches.
          </p>
          
          <div className="flex items-center gap-4 mb-4 text-sm">
            <div className="flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
              <span className="text-gray-700">App Icon</span>
            </div>
            <div className="flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
              <span className="text-gray-700">Screenshots</span>
            </div>
            <div className="flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
              <span className="text-gray-700">Store Info</span>
            </div>
          </div>
          
          <Link to="/app-store">
            <Button className="bg-blue-500 hover:bg-blue-600 group-hover:gap-3 gap-2 transition-all">
              View Assets
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
}
