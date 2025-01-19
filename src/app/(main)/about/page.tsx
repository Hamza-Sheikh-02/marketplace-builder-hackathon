import AboutFeatureSection from "@/components/AboutPageComponents/AboutFeature";
import AboutHeroSection from "@/components/AboutPageComponents/AboutHero";
import AboutNewsletterSection from "@/components/AboutPageComponents/NewsletterSection";
import BrandDifference from "@/components/HomePageComponents/BrandDifference";
import FeatureSection from "@/components/HomePageComponents/Feature";

const About = () => {
  return (
    <div>
      <AboutHeroSection />
      <FeatureSection />
      <main className="pt-[60px]">
        <AboutFeatureSection />
      </main>
      <BrandDifference />
      <AboutNewsletterSection />
    </div>
  );
};

export default About;
