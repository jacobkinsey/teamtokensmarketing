import EquityCalculator from "./components/equityCalculator/equityCalculator";
import Hero from "./components/hero/hero";
import Features from "./components/features/features";
import About from "./components/about/about";
import Support from "./components/support/support";

export default function Home() {
  return (
    <main>
      <EquityCalculator />
      {/* <Hero /> */}
      <Features />
      <About />
      <Support />
    </main>
  );
}
