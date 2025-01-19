import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const AboutFeature = () => {
  return (
    <div className="flex flex-col md:flex-row bg-background max-w-[1264px] mx-auto md:space-x-4 space-y-4 md:space-y-0 px-4 md:px-0">
      <Card className="w-full md:w-[630px] h-[380px] md:h-[478px] relative shadow-md overflow-hidden">
        <Image
          src="/aboutfeature.png"
          alt="Decorative"
          fill
          className="object-cover rounded-lg"
        />
      </Card>

      <Card className="w-full md:w-[634px] h-[380px] md:h-[478px] bg-card text-card-foreground flex flex-col justify-center px-8 py-6 shadow-md">
        <CardHeader>
          <CardTitle className="text-xl md:text-2xl font-semibold mb-4">
            Our service isn&apos;t just personal, it&apos;s actually hyper
            personally exquisite
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm md:text-base leading-relaxed mb-6 text-muted-foreground">
            When we started Avion, the idea was simple. Make high-quality
            furniture affordable and available for the mass market. Handmade,
            and lovingly crafted furniture and homeware is what we live,
            breathe, and design so our Chelsea boutique became the hotbed for
            the London interior design community.
          </p>
          <Button
            className="text-wite bg-primary hover:bg-primary/80"
            variant="outline"
          >
            Get in touch
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AboutFeature;
