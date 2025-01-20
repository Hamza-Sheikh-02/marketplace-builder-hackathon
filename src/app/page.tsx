import HeroSection from "@/components/HomePageComponents/Hero";
import BrandDifference from "@/components/HomePageComponents/BrandDifference";
import FeatureSection from "@/components/HomePageComponents/Feature";
import EmailSignUp from "@/components/HomePageComponents/EmailSignUp";
import BestSelling from "@/components/HomePageComponents/BestSelling";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <BrandDifference />
      <BestSelling />
      <FeatureSection />
      <main className="pt-12">
        <EmailSignUp />
      </main>
    </div>
  );
};

export default Home;
