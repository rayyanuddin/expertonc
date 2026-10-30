"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import styles from "./motion-main.module.css";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type MotionMainProps = Readonly<{ children: React.ReactNode }>;

const EASE = "power3.out";

function revealWords(element: HTMLElement) {
  if (element.dataset.motionWords === "ready") return;

  const original = element.innerHTML;
  const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
  const textNodes: Text[] = [];

  while (walker.nextNode()) {
    const node = walker.currentNode as Text;
    if (node.textContent?.trim()) textNodes.push(node);
  }

  textNodes.forEach((node) => {
    const fragment = document.createDocumentFragment();
    const parts = node.textContent?.split(/(\s+)/) ?? [];
    parts.forEach((part) => {
      if (!part.trim()) {
        fragment.append(part);
        return;
      }
      const clip = document.createElement("span");
      clip.className = "motion-word-clip";
      const word = document.createElement("span");
      word.className = "motion-word";
      word.textContent = part;
      clip.append(word);
      fragment.append(clip);
    });
    node.replaceWith(fragment);
  });

  element.dataset.motionWords = "ready";
  return () => {
    element.innerHTML = original;
    delete element.dataset.motionWords;
  };
}

function prepareTypewriter(element: HTMLElement) {
  if (element.dataset.motionType === "ready") return;
  const original = element.innerHTML;
  const words = (element.textContent ?? "").split(/(\s+)/);
  element.replaceChildren();
  words.forEach((part) => {
    if (!part.trim()) {
      element.append(part);
      return;
    }
    const word = document.createElement("span");
    word.className = "motion-type-word";
    word.textContent = part;
    element.append(word);
  });
  element.dataset.motionType = "ready";
  return () => {
    element.innerHTML = original;
    delete element.dataset.motionType;
  };
}

function buildMarquee(track: HTMLElement) {
  if (track.dataset.motionMarquee === "ready") return;
  const originals = Array.from(track.children);
  if (!originals.length) return;

  originals.forEach((child) => {
    const clone = child.cloneNode(true) as HTMLElement;
    clone.setAttribute("aria-hidden", "true");
    clone.dataset.motionClone = "true";
    track.append(clone);
  });
  track.dataset.motionMarquee = "ready";

  return () => {
    track.querySelectorAll('[data-motion-clone="true"]').forEach((node) => node.remove());
    delete track.dataset.motionMarquee;
  };
}

export function MotionMain({ children }: MotionMainProps) {
  const scope = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useGSAP(
    () => {
      const root = scope.current;
      if (!root) return;

      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      root.dataset.motion = reducedMotion ? "reduced" : "ready";

      if (reducedMotion) {
        gsap.set(root.querySelectorAll("*"), { clearProps: "transform,opacity,visibility,clipPath" });
        return;
      }

      const cleanups: Array<() => void> = [];
      const mm = gsap.matchMedia();

      gsap.fromTo(
        root,
        { autoAlpha: 0.94 },
        { autoAlpha: 1, duration: 0.45, ease: EASE, clearProps: "opacity,visibility" },
      );

      root.querySelectorAll<HTMLElement>(".hero h1, .pageHero h1").forEach((heading) => {
        // The homepage title uses a clipped gradient. Splitting that text into
        // independently transformed spans causes WebKit/Chromium to paint a
        // transient duplicate layer. Keep its existing typography intact and
        // animate the heading as a single composited layer instead.
        if (heading.matches(".hero h1")) {
          gsap.fromTo(
            heading,
            { y: 24, autoAlpha: 0 },
            {
              y: 0,
              autoAlpha: 1,
              duration: 0.9,
              delay: 0.06,
              ease: EASE,
              clearProps: "transform,opacity,visibility",
            },
          );
          return;
        }

        const cleanup = revealWords(heading);
        if (cleanup) cleanups.push(cleanup);
        gsap.fromTo(
          heading.querySelectorAll(".motion-word"),
          { yPercent: 115, rotate: 2 },
          { yPercent: 0, rotate: 0, duration: 0.95, stagger: 0.045, ease: EASE, delay: 0.06 },
        );
      });

      const hero = root.querySelector<HTMLElement>(".hero");
      if (hero) {
        const showcase = hero.querySelector<HTMLElement>(".heroShowcase");
        const heroIntro = hero.querySelector<HTMLElement>(".heroIntro");
        const demoCards = hero.querySelectorAll<HTMLElement>(".demoCard");
        const typedLines = hero.querySelectorAll<HTMLElement>(".demoCard .tiny");
        typedLines.forEach((line) => {
          const cleanup = prepareTypewriter(line);
          if (cleanup) cleanups.push(cleanup);
        });

        const intro = gsap.timeline({ defaults: { ease: EASE } });
        intro
          .from(hero.querySelectorAll(".eyebrow, .tagline"), { y: 18, duration: 0.55 }, 0.12)
          .from(hero.querySelectorAll("p, .btn, .storeBadge, .comingSoonNotice"), { y: 22, duration: 0.65, stagger: 0.07 }, 0.28)
          .from(hero.querySelectorAll(".phone, .demo"), { autoAlpha: 0, y: 48, scale: 0.94, duration: 1, stagger: 0.12 }, 0.2)
          .fromTo(demoCards[0], { autoAlpha: 0.45, scale: 0.96 }, { autoAlpha: 1, scale: 1, duration: 0.45 }, 0.65)
          .fromTo(demoCards[0]?.querySelectorAll(".motion-type-word") ?? [], { autoAlpha: 0, y: 5 }, { autoAlpha: 1, y: 0, duration: 0.06, stagger: 0.055 }, 0.78)
          .to(demoCards[0], { autoAlpha: 0.62, scale: 0.985, duration: 0.4 }, 1.55)
          .fromTo(demoCards[1], { autoAlpha: 0.45, scale: 0.96 }, { autoAlpha: 1, scale: 1, duration: 0.45 }, 1.55)
          .fromTo(demoCards[1]?.querySelectorAll(".motion-type-word") ?? [], { autoAlpha: 0, y: 5 }, { autoAlpha: 1, y: 0, duration: 0.06, stagger: 0.05 }, 1.68)
          .set(hero.querySelectorAll(".btn, .tagline, .comingSoonNotice"), { clearProps: "transform" }, 2.6);

        const waveBars = hero.querySelectorAll<HTMLElement>(".waveform i");
        gsap.fromTo(waveBars, { scaleY: 0.35 }, {
          scaleY: 1,
          duration: 0.42,
          stagger: { each: 0.075, from: "center" },
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        gsap.to(hero.querySelectorAll(".orb, .demoArrow"), {
          y: -8,
          rotate: 2,
          duration: 2.6,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });

        gsap.to(hero.querySelectorAll(".phone, .demo"), {
          yPercent: -7,
          ease: "none",
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "bottom top",
            scrub: 0.7,
            invalidateOnRefresh: true,
          },
        });

        if (heroIntro) {
          gsap.fromTo(
            heroIntro,
            { y: 0 },
            {
              y: -44,
              ease: "none",
              scrollTrigger: {
                trigger: hero,
                start: "top top",
                end: "bottom top",
                scrub: 0.8,
                invalidateOnRefresh: true,
              },
            },
          );
        }

        if (showcase) {
          gsap.fromTo(
            showcase,
            { scale: 0.965, borderRadius: 42 },
            {
              scale: 1,
              borderRadius: 22,
              ease: "none",
              scrollTrigger: {
                trigger: hero,
                start: "top 12%",
                end: "bottom 42%",
                scrub: 0.8,
                invalidateOnRefresh: true,
              },
            },
          );
        }

        gsap.to(hero, {
          backgroundPosition: "70% 18%, 10px 30px",
          ease: "none",
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });
      }

      mm.add("(min-width: 900px)", () => {
        root.querySelectorAll<HTMLElement>(".feature").forEach((feature, index) => {
          const stage = feature.querySelector<HTMLElement>(".screenStage");
          const copy = feature.querySelector<HTMLElement>(":scope > div:not(.screenStage):not(.media)");
          if (!stage) return;

        const story = feature.closest<HTMLElement>(".featureStory");
        if (story) {
          const phone = stage.querySelector<HTMLElement>(".phone");
          const recording = stage.querySelector<HTMLElement>(".recordingFlowRecord");
          const summary = stage.querySelector<HTMLElement>(".recordingFlowSummary");
          const recordingWave = stage.querySelectorAll<HTMLElement>(".recordingFlowWave i");
          if (recordingWave.length) {
            gsap.fromTo(
              recordingWave,
              { scaleY: 0.45 },
              {
                scaleY: 1,
                duration: 0.48,
                stagger: { each: 0.045, from: "center" },
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
              },
            );
          }
          const storyTimeline = gsap.timeline({
              scrollTrigger: {
                trigger: story,
                pin: feature,
                pinSpacing: true,
                start: "top top+=84",
                end: "+=55%",
                scrub: 0.8,
                anticipatePin: 1,
                invalidateOnRefresh: true,
              },
            });

            storyTimeline.fromTo(
              stage,
              { scale: 0.9, y: 44, borderRadius: "72px 24px 72px 24px" },
              { scale: 1, y: 0, borderRadius: "28px", ease: "none", duration: 1 },
              0,
            );
            if (recording && summary) {
              storyTimeline
                .fromTo(
                  recording,
                  { scale: 1, autoAlpha: 1 },
                  { scale: 0.96, autoAlpha: 0.78, ease: "none", duration: 0.55 },
                  0.25,
                )
                .fromTo(
                  summary,
                  { x: 18, scale: 0.96, autoAlpha: 0 },
                  { x: 0, scale: 1, autoAlpha: 1, ease: "none", duration: 0.65 },
                  0.35,
                );
            }
            if (phone) {
              storyTimeline.fromTo(
                phone,
                { yPercent: 12, scale: 0.94, rotate: -1.2 },
                { yPercent: -3, scale: 1, rotate: 0, ease: "none", duration: 1 },
                0,
              );
            }
            if (copy) {
              storyTimeline.fromTo(
                copy,
                { x: feature.classList.contains("reverse") ? -36 : 36 },
                { x: 0, ease: "none", duration: 1 },
                0,
              );
            }
            return;
          }

          gsap.fromTo(
            stage,
            {
              scale: 0.88,
              y: 64,
              borderRadius: index % 2 ? "72px 24px 72px 24px" : "24px 72px 24px 72px",
            },
            {
              scale: 1,
              y: 0,
              borderRadius: "28px",
              ease: "none",
              scrollTrigger: {
                trigger: feature,
                start: "top 90%",
                end: "center 48%",
                scrub: 0.75,
                invalidateOnRefresh: true,
              },
            },
          );

          const phone = stage.querySelector(".phone");
          if (phone) {
            gsap.fromTo(phone, { yPercent: 13, scale: 0.94 }, {
              yPercent: -4,
              scale: 1,
              ease: "none",
              scrollTrigger: {
                trigger: feature,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.9,
                invalidateOnRefresh: true,
              },
            });
          }

          if (copy) {
            gsap.fromTo(copy, { x: index % 2 ? -42 : 42, autoAlpha: 0.45 }, {
              x: 0,
              autoAlpha: 1,
              ease: "none",
              scrollTrigger: {
                trigger: feature,
                start: "top 82%",
                end: "center 52%",
                scrub: 0.65,
              },
            });
          }
        });

        const steps = root.querySelector<HTMLElement>(".steps");
        if (steps && steps.children.length > 1) {
          const cards = Array.from(steps.children) as HTMLElement[];
          const progress = steps.parentElement?.querySelector<HTMLElement>(".storyProgress span");
          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: steps,
              start: "center center",
              end: "+=85%",
              pin: steps.parentElement ?? steps,
              pinSpacing: true,
              scrub: 0.8,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          if (progress) timeline.fromTo(progress, { scaleX: 0 }, { scaleX: 1, duration: cards.length, ease: "none" }, 0);

          cards.forEach((card, index) => {
            timeline
              .to(cards, { scale: 0.94, autoAlpha: 0.48, y: 8, duration: 0.35, ease: "power2.inOut" }, index)
              .to(card, { scale: 1.045, autoAlpha: 1, y: -12, rotate: 0, borderRadius: 28, zIndex: 3, duration: 0.6, ease: "power2.inOut" }, index)
              .to(card, { scale: 0.97, y: 0, zIndex: 1, duration: 0.35, ease: "power2.inOut" }, index + 0.65);
          });
        }

        const dark = root.querySelector<HTMLElement>(".dark");
        if (dark) {
          gsap.fromTo(dark, { scaleX: 0.965, borderRadius: 56 }, {
            scaleX: 1,
            borderRadius: 0,
            ease: "none",
            scrollTrigger: {
              trigger: dark,
              start: "top 88%",
              end: "top 24%",
              scrub: 0.7,
              invalidateOnRefresh: true,
            },
          });
        }

        root.querySelectorAll<HTMLElement>(".ctaBand").forEach((band) => {
          gsap.fromTo(
            band,
            { scale: 0.955, borderRadius: 44 },
            {
              scale: 1,
              borderRadius: 26,
              ease: "none",
              scrollTrigger: {
                trigger: band,
                start: "top 94%",
                end: "top 42%",
                scrub: 0.7,
                invalidateOnRefresh: true,
              },
            },
          );
        });

        root.querySelectorAll<HTMLElement>(".featureItem").forEach((item, index) => {
          const phone = item.querySelector<HTMLElement>(".phone");
          const copy = item.querySelector<HTMLElement>(":scope > div");

          if (phone) {
            gsap.fromTo(phone, {
              x: index % 2 ? 52 : -52,
              y: 42,
              scale: 0.88,
              rotate: index % 2 ? 2 : -2,
              borderRadius: 58,
            }, {
              x: 0,
              y: 0,
              scale: 1,
              rotate: 0,
              borderRadius: 44,
              ease: "none",
              scrollTrigger: {
                trigger: item,
                start: "top 90%",
                end: "center 52%",
                scrub: 0.75,
                invalidateOnRefresh: true,
              },
            });
          }

          if (copy) {
            gsap.fromTo(copy, { autoAlpha: 0.42, y: 36 }, {
              autoAlpha: 1,
              y: 0,
              ease: "none",
              scrollTrigger: {
                trigger: item,
                start: "top 84%",
                end: "center 54%",
                scrub: 0.6,
              },
            });
          }
        });
      });

      mm.add("(max-width: 899px)", () => {
        root.querySelectorAll<HTMLElement>(".feature, .featureItem, .lessonLink").forEach((item) => {
          gsap.fromTo(item, { y: 30, autoAlpha: 0.55 }, {
            y: 0,
            autoAlpha: 1,
            duration: 0.7,
            ease: EASE,
            scrollTrigger: { trigger: item, start: "top 88%", once: true },
          });
        });

        const cards = gsap.utils.toArray<HTMLElement>(root.querySelectorAll(".steps > *"));
        if (cards.length > 1) {
          const cycle = gsap.timeline({ repeat: -1, repeatDelay: 0.3 });
          cards.forEach((card) => {
            cycle
              .to(card, { scale: 1.025, y: -5, duration: 0.45, ease: "power2.out" })
              .to(card, { scale: 1, y: 0, duration: 0.45, ease: "power2.in" }, "+=1.8");
          });
        }
      });

      root.querySelectorAll<HTMLElement>(".section h2, .sectionTitle, .featureItem h2").forEach((heading) => {
        gsap.fromTo(heading, { y: 34, autoAlpha: 0 }, {
          y: 0,
          autoAlpha: 1,
          duration: 0.85,
          ease: EASE,
          scrollTrigger: { trigger: heading, start: "top 88%", once: true },
        });
      });

      root.querySelectorAll<HTMLElement>(".lede").forEach((line) => {
        gsap.fromTo(line, { y: 24, autoAlpha: 0, clipPath: "inset(0 0 100% 0)" }, {
          y: 0,
          autoAlpha: 1,
          clipPath: "inset(0 0 0% 0)",
          duration: 0.8,
          ease: EASE,
          scrollTrigger: { trigger: line, start: "top 90%", once: true },
        });
      });

      root.querySelectorAll<HTMLElement>(".screenStage .phone, .featureItem .phone").forEach((phone) => {
        gsap.fromTo(phone, { clipPath: "inset(8% 0 10% 0 round 34px)" }, {
          clipPath: "inset(0% 0 0% 0 round 34px)",
          ease: "none",
          scrollTrigger: {
            trigger: phone,
            start: "top 92%",
            end: "center 58%",
            scrub: 0.65,
            invalidateOnRefresh: true,
          },
        });
      });

      root.querySelectorAll<SVGGeometryElement>(".feature svg path, .ctaBand svg path").forEach((path) => {
        const length = path.getTotalLength?.();
        if (!length) return;
        gsap.fromTo(path, { strokeDasharray: length, strokeDashoffset: length }, {
          strokeDashoffset: 0,
          duration: 0.85,
          ease: "power2.out",
          scrollTrigger: { trigger: path.closest("svg") ?? path, start: "top 90%", once: true },
        });
      });

      root.querySelectorAll<HTMLElement>(".grid3, .lessonList, .promiseGrid").forEach((group) => {
        gsap.fromTo(group.children, { y: 34, scale: 0.965, autoAlpha: 0 }, {
          y: 0,
          scale: 1,
          autoAlpha: 1,
          duration: 0.75,
          stagger: 0.09,
          ease: EASE,
          clearProps: "transform,translate,rotate,scale",
          scrollTrigger: { trigger: group, start: "top 86%", once: true },
        });
      });

      root.querySelectorAll<HTMLElement>(".resourceStrip .names").forEach((track) => {
        const cleanup = buildMarquee(track);
        if (cleanup) cleanups.push(cleanup);
        const marquee = gsap.to(track, {
          x: () => {
            const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 0;
            return -(track.scrollWidth + gap) / 2;
          },
          duration: 26,
          ease: "none",
          repeat: -1,
          repeatRefresh: true,
        });
        const host = track.parentElement;
        const pause = () => marquee.pause();
        const resume = () => marquee.resume();
        host?.addEventListener("pointerenter", pause);
        host?.addEventListener("pointerleave", resume);
        host?.addEventListener("focusin", pause);
        host?.addEventListener("focusout", resume);
        cleanups.push(() => {
          host?.removeEventListener("pointerenter", pause);
          host?.removeEventListener("pointerleave", resume);
          host?.removeEventListener("focusin", pause);
          host?.removeEventListener("focusout", resume);
        });
      });

      const refresh = () => ScrollTrigger.refresh();
      document.fonts?.ready.then(refresh).catch(() => undefined);
      window.addEventListener("load", refresh, { once: true });

      return () => {
        window.removeEventListener("load", refresh);
        mm.revert();
        cleanups.reverse().forEach((cleanup) => cleanup());
        delete root.dataset.motion;
      };
    },
    { scope, dependencies: [pathname], revertOnUpdate: true },
  );

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => window.cancelAnimationFrame(frame);
  }, [pathname]);

  return (
    <div className={styles.page} ref={scope}>
      {children}
    </div>
  );
}
