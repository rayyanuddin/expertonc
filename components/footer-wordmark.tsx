"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function FooterWordmark() {
  const wordmarkRef = useRef<HTMLAnchorElement>(null);

  useGSAP(
    () => {
      const wordmark = wordmarkRef.current;
      if (!wordmark) return;

      const media = gsap.matchMedia();
      const footer = wordmark.closest<HTMLElement>(".footer");

      if (footer) {
        media.add("(prefers-reduced-motion: no-preference)", () => {
          const columns = footer.querySelectorAll<HTMLElement>(".footerGrid > *");
          const bottom = footer.querySelector<HTMLElement>(".footerBottom");

          gsap.fromTo(
            columns,
            { y: 28, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.65,
              stagger: 0.08,
              ease: "power3.out",
              scrollTrigger: { trigger: footer.querySelector(".footerGrid"), start: "top 88%", once: true },
            },
          );
          if (bottom) {
            gsap.fromTo(
              bottom,
              { y: 18, autoAlpha: 0 },
              {
                y: 0,
                autoAlpha: 1,
                duration: 0.6,
                ease: "power3.out",
                scrollTrigger: { trigger: bottom, start: "top 96%", once: true },
              },
            );
          }
        });
      }

      const reveal = () => {
        gsap.fromTo(
          wordmark,
          { y: 14, scale: 0.96, autoAlpha: 0.55, transformOrigin: "left center" },
          {
            y: 0,
            scale: 1,
            autoAlpha: 1,
            duration: 0.65,
            ease: "power3.out",
            scrollTrigger: {
              trigger: wordmark,
              start: "top 92%",
              once: true,
              invalidateOnRefresh: true,
            },
          },
        );
      };

      media.add(
        "(min-width: 801px) and (prefers-reduced-motion: no-preference)",
        reveal,
      );
      media.add(
        "(max-width: 800px) and (prefers-reduced-motion: no-preference)",
        reveal,
      );

      return () => media.revert();
    },
    { scope: wordmarkRef },
  );

  return (
    <Link ref={wordmarkRef} href="/" className="footerWordmark" aria-label="ExpertOnc home">
      <Image
        src="/brand/expertonc-logo.png"
        width={990}
        height={620}
        alt="ExpertOnc"
      />
    </Link>
  );
}
