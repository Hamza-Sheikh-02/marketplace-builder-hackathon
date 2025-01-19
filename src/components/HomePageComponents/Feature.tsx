import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const FeatureSection = () => {
  return (
    <div className="flex flex-col md:flex-row bg-background max-w-[1264px] mx-auto md:space-x-4 space-y-4 md:space-y-0 px-4 md:px-0">
      <Card className="w-full md:w-[634px] h-[380px] md:h-[478px] bg-card text-card-foreground flex flex-col justify-center px-8 py-6 shadow-md">
        <CardHeader>
          <CardTitle className="text-xl md:text-2xl font-semibold mb-4">
            It started with a small idea
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm md:text-base leading-relaxed mb-6">
            A global brand with local beginnings, our story began in a small
            studio in South Karachi in early 2015.
          </p>
          <Link href="/products">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/80">
              View collection
            </Button>
          </Link>
        </CardContent>
      </Card>

      <Card className="w-full md:w-[630px] h-[380px] md:h-[478px] relative shadow-md overflow-hidden">
        <Image
          src="/feature.png"
          alt="Furniture"
          fill
          className="object-cover rounded-lg"
        />
      </Card>
    </div>
  );
};

export default FeatureSection;
