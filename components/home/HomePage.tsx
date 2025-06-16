import React from 'react';
import { HeroSection } from './HeroSection';
import { HowItWorksSection } from './HowItWorksSection';
import { ExamplesSection } from './ExamplesSection';
import { AdvantagesSection } from './AdvantagesSection';
import { TestimonialsSection } from './TestimonialsSection';
import { PricingSection } from './PricingSection';
import { FaqSection } from './FaqSection';

export const HomePage: React.FC = () => {
  return (
    <main>
      <HeroSection />
      <HowItWorksSection />
      <ExamplesSection />
      <AdvantagesSection />
      <TestimonialsSection />
      <PricingSection />
      <FaqSection />
    </main>
  );
}; 