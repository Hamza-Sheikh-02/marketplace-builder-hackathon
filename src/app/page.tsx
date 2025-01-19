import BrandDifference from "@/components/HomePageComponents/BrandDifference";
import EmailSignUp from "@/components/HomePageComponents/EmailSignUp";
import FeatureSection from "@/components/HomePageComponents/Feature";
import HeroSection from "@/components/HomePageComponents/Hero";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <BrandDifference />
      <FeatureSection />
      <EmailSignUp />
    </div>
  );
};

export default Home;
