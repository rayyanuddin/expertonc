"use client";

import { useRef } from "react";
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

      const reveal = (scale: number, y: number, end: string) => {
        gsap.fromTo(
          wordmark,
          { y, scale, autoAlpha: 0.2, transformOrigin: "50% 50%" },
          {
            y: 0,
            scale: 1,
            autoAlpha: 1,
            ease: "none",
            scrollTrigger: {
              trigger: wordmark,
              start: "top 96%",
              end,
              scrub: 0.7,
              invalidateOnRefresh: true,
            },
          },
        );
      };

      media.add(
        "(min-width: 801px) and (prefers-reduced-motion: no-preference)",
        () => reveal(0.22, 96, "top 82%"),
      );
      media.add(
        "(max-width: 800px) and (prefers-reduced-motion: no-preference)",
        () => reveal(0.72, 28, "top 75%"),
      );

      return () => media.revert();
    },
    { scope: wordmarkRef },
  );

  return (
    <Link ref={wordmarkRef} href="/" className="footerWordmark" aria-label="ExpertOnc home">
      Expert<span>Onc</span>
    </Link>
  );
}
