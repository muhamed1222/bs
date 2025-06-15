import React, { useEffect, useState } from "react";
import StandardPageLayout from "../layouts/StandardPageLayout";
import HeroSection from "../components/home/HeroSection";
import HowItWorksSection from "../components/home/HowItWorksSection";
import ExamplesSection from "../components/home/ExamplesSection";
import ReviewsSection from "../components/home/ReviewsSection";
import CtaSection from "../components/home/CtaSection";
import FooterSection from "../components/home/FooterSection";
import {
  fetchCases,
  fetchStats,
  fetchReviews,
  type HomeCase,
  type HomeStats,
  type HomeReview,
} from "../mock/home";

const HomePage: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [cases, setCases] = useState<HomeCase[]>([]);
  const [stats, setStats] = useState<HomeStats | null>(null);
  const [reviews, setReviews] = useState<HomeReview[]>([]);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetchCases().catch(() => []),
      fetchStats().catch(() => null),
      fetchReviews().catch(() => []),
    ]).then(([cases, stats, reviews]) => {
      setCases(cases);
      setStats(stats);
      setReviews(reviews);
      setLoading(false);
    });
  }, []);

  return (
    <StandardPageLayout title="Basis — твоя цифровая визитка нового поколения">
      <main className="space-y-32">
        <HeroSection stats={stats} />
        <HowItWorksSection />
        <ExamplesSection cases={cases} loading={loading} />
        <ReviewsSection reviews={reviews} loading={loading} />
        <CtaSection />
        <FooterSection />
      </main>
    </StandardPageLayout>
  );
};

export default HomePage;
