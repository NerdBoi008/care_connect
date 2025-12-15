import { HeroSection } from '@/components/home/hero-section';
import { FeaturesSection } from '@/components/home/features-section';
import { SpecializationsSection } from '@/components/home/specializations-section';
import { TopDoctorsSection } from '@/components/home/top-doctors-section';
import { HowItWorksSection } from '@/components/home/how-it-works-section';
import { CTASection } from '@/components/home/cta-section';
import { StatsSection } from '@/components/home/stats-section';

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <SpecializationsSection />
      <TopDoctorsSection />
      <HowItWorksSection />
      <CTASection />
    </main>
  );
}
