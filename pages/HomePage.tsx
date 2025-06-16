import React from 'react';
import { HeroSection } from '../components/home/HeroSection';
import { HowItWorksSection } from '../components/home/HowItWorksSection';
import { ExamplesSection } from '../components/home/ExamplesSection';
import { AdvantagesSection } from '../components/home/AdvantagesSection';
import { TestimonialsSection } from '../components/home/TestimonialsSection';
import { PricingSection } from '../components/home/PricingSection';
import { FaqSection } from '../components/home/FaqSection';
import FloatingCTA from '../components/common/FloatingCTA';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <main>
        <HeroSection />
        <HowItWorksSection />
        <ExamplesSection />
        <AdvantagesSection />
        <TestimonialsSection />
        <PricingSection />
        <FaqSection />
      </main>
      <FloatingCTA />
    </div>
  );
};

export default HomePage;
