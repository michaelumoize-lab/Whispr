import HeroSection from "@/components/Home/HeroSection";
import HowItWorksSection from "@/components/Home/HowItWorksSection";
import StoryShowcaseSection from "@/components/Home/StoryShowcaseSection";
import FeaturesSection from "@/components/Home/FeaturesSection";
import FaqSection from "@/components/Home/FaqSection";
import CtaSection from "@/components/Home/CtaSection";
import Footer from "@/components/Home/Footer";

export default function HomePage() {
  return (
    <div className="w-full space-y-0">
      <HeroSection />
      <HowItWorksSection />
      <StoryShowcaseSection />
      <FeaturesSection />
      <FaqSection />
      <CtaSection />
      <Footer />
    </div>
  );
}
