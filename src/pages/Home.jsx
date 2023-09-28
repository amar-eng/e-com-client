import { FeaturedScents } from '../layouts/FeaturedScents';
import { Hero } from '../layouts/Hero';
import { HowItWorks } from '../layouts/HowItWorks';
import { WhyUs } from '../layouts/WhyUs';

export const Home = () => {
  return (
    <>
      <Hero />
      <FeaturedScents />
      <HowItWorks />
      <WhyUs />
    </>
  );
};
