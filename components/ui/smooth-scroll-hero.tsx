"use client";
import * as React from "react";
import { motion, useMotionTemplate, useScroll, useTransform } from "framer-motion";

interface iISmoothScrollHeroProps {
  scrollHeight: number;
  desktopImage: string;
  mobileImage: string;
  initialClipPercentage: number;
  finalClipPercentage: number;
  videoSrc?: string;
}

interface iISmoothScrollHeroBackgroundProps extends iISmoothScrollHeroProps {}

const SmoothScrollHeroBackground: React.FC<iISmoothScrollHeroBackgroundProps> = ({
  scrollHeight, desktopImage, mobileImage, initialClipPercentage, finalClipPercentage, videoSrc,
}) => {
  const { scrollY } = useScroll();
  const clipStart = useTransform(scrollY, [0, scrollHeight], [initialClipPercentage, 0]);
  const clipEnd = useTransform(scrollY, [0, scrollHeight], [finalClipPercentage, 100]);
  const clipPath = useMotionTemplate`polygon(${clipStart}% ${clipStart}%, ${clipEnd}% ${clipStart}%, ${clipEnd}% ${clipEnd}%, ${clipStart}% ${clipEnd}%)`;
  const backgroundSize = useTransform(scrollY, [0, scrollHeight + 500], ["170%", "100%"]);

  return (
    <motion.div className="sticky top-0 h-screen w-full bg-black" style={{ clipPath, willChange: "transform, opacity" }}>
      {videoSrc ? (
        <video
          src={videoSrc}
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.6,
            zIndex: 0,
          }}
        />
      ) : (
        <>
          <motion.div className="absolute inset-0 md:hidden" style={{ backgroundImage: `url(${mobileImage})`, backgroundSize, backgroundPosition: "center", backgroundRepeat: "no-repeat" }} />
          <motion.div className="absolute inset-0 hidden md:block" style={{ backgroundImage: `url(${desktopImage})`, backgroundSize, backgroundPosition: "center", backgroundRepeat: "no-repeat" }} />
        </>
      )}
    </motion.div>
  );
};

const SmoothScrollHero: React.FC<iISmoothScrollHeroProps> = ({
  scrollHeight = 1500,
  desktopImage = "https://images.unsplash.com/photo-1511884642898-4c92249e20b6",
  mobileImage = "https://images.unsplash.com/photo-1511207538754-e8555f2bc187",
  initialClipPercentage = 25,
  finalClipPercentage = 75,
  videoSrc,
}) => {
  return (
    <div style={{ height: `calc(${scrollHeight}px + 100vh)` }} className="relative w-full">
      <SmoothScrollHeroBackground scrollHeight={scrollHeight} desktopImage={desktopImage} mobileImage={mobileImage} initialClipPercentage={initialClipPercentage} finalClipPercentage={finalClipPercentage} videoSrc={videoSrc} />
    </div>
  );
};

export default SmoothScrollHero;
