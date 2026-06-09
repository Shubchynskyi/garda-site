import { motion, useReducedMotion } from "framer-motion";
import { CliSurfaceSection } from "./components/sections/CliSurfaceSection";
import { ComparisonSection } from "./components/sections/ComparisonSection";
import { DemoSection } from "./components/sections/DemoSection";
import { DocsSection } from "./components/sections/DocsSection";
import { FinalCtaSection } from "./components/sections/FinalCtaSection";
import { Header } from "./components/sections/Header";
import { HeroSection } from "./components/sections/HeroSection";
import { PositioningSection } from "./components/sections/PositioningSection";
import { ProfilesSection } from "./components/sections/ProfilesSection";
import { RuntimeLayerSection } from "./components/sections/RuntimeLayerSection";
import { SecuritySection } from "./components/sections/SecuritySection";
import { StartSection } from "./components/sections/StartSection";
import { SupportFooter } from "./components/sections/SupportFooter";
import { SupportSection } from "./components/sections/SupportSection";
import { WorkflowSection } from "./components/sections/WorkflowSection";
import { InstallShortcut } from "./components/ui/InstallShortcut";

export default function GardaLandingPage() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="min-h-screen bg-[#04070d] text-white">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.08),transparent_28%),radial-gradient(circle_at_82%_18%,rgba(16,185,129,0.08),transparent_24%),linear-gradient(180deg,#04070d_0%,#071019_50%,#04070d_100%)]" />
      <motion.div
        className="fixed -left-20 top-10 -z-10 h-80 w-80 rounded-full bg-cyan-400/8 blur-3xl"
        animate={prefersReducedMotion ? undefined : { y: [0, -18, 0] }}
        transition={prefersReducedMotion ? undefined : { duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="fixed right-0 top-1/3 -z-10 h-80 w-80 rounded-full bg-fuchsia-400/[0.07] blur-3xl"
        animate={prefersReducedMotion ? undefined : { y: [0, 16, 0] }}
        transition={prefersReducedMotion ? undefined : { duration: 10, repeat: Infinity }}
      />
      <motion.div
        className="fixed bottom-0 left-1/3 -z-10 h-80 w-80 rounded-full bg-emerald-400/[0.07] blur-3xl"
        animate={prefersReducedMotion ? undefined : { y: [0, -12, 0] }}
        transition={prefersReducedMotion ? undefined : { duration: 9, repeat: Infinity }}
      />

      <Header />
      <main>
        <HeroSection />
        <DemoSection />
        <ComparisonSection />
        <RuntimeLayerSection />
        <PositioningSection />
        <WorkflowSection />
        <ProfilesSection />
        <DocsSection />
        <CliSurfaceSection />
        <StartSection />
        <SecuritySection />
        <SupportSection />
        <FinalCtaSection />
      </main>
      <SupportFooter />
      <InstallShortcut />
    </div>
  );
}
