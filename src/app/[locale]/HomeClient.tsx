"use client";

import { useRef } from "react";
import BackgroundEngine from "@/components/BackgroundEngine";
import BackgroundLayer from "@/components/BackgroundLayer";
import CommandPalette from "@/components/CommandPalette";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ProgressBar from "@/components/ProgressBar";
import RevealEngine from "@/components/RevealEngine";
import StatusBar from "@/components/StatusBar";
import CaseStudies from "@/components/sections/CaseStudies";
import Contact from "@/components/sections/Contact";
import Hero from "@/components/sections/Hero";
import Numbers from "@/components/sections/Numbers";
import Skills from "@/components/sections/Skills";
import Thesis from "@/components/sections/Thesis";
import Timeline from "@/components/sections/Timeline";
import type { Content } from "@/data/types";
import { ContentProvider } from "@/i18n/ContentProvider";
import type { Locale } from "@/i18n/config";
import { refreshBackgroundColors } from "@/lib/backgroundEngine";
import { useScrollChrome } from "@/hooks/useScrollChrome";
import { useSmoothJump } from "@/hooks/useDossierIndex";
import { useTheme } from "@/hooks/useTheme";

export default function HomeClient({ content, locale }: { content: Content; locale: Locale }) {
  const { theme, toggleTheme } = useTheme();
  const progressRef = useRef<HTMLDivElement>(null);
  const spotRef = useRef<HTMLDivElement>(null);
  const clockRef = useRef<HTMLSpanElement>(null);

  useScrollChrome(progressRef, spotRef, clockRef);
  useSmoothJump();

  const handleToggleTheme = () => {
    toggleTheme();
    refreshBackgroundColors();
  };

  return (
    <ContentProvider value={{ content, locale }}>
      <div style={{ position: "relative", minHeight: "100vh", background: "var(--bg)" }}>
        <BackgroundEngine />
        <BackgroundLayer spotRef={spotRef} />

        <div data-main="1" style={{ position: "relative", zIndex: 1 }}>
          <ProgressBar progressRef={progressRef} />
          <Header theme={theme} toggleTheme={handleToggleTheme} />
          <StatusBar clockRef={clockRef} />

          <main id="contenu">
            <Hero />
            <Thesis />
            <CaseStudies />
            <Numbers />
            <Skills />
            <Timeline />
            <Contact />
          </main>

          <Footer />
        </div>

        <RevealEngine />
        <CommandPalette />
      </div>
    </ContentProvider>
  );
}
