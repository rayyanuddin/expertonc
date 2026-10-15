"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import type { CSSProperties } from "react";
import { downloadLabel } from "@/lib/config";

const navigationItems = [
  ["Home", "/"],
  ["Features", "/features"],
  ["Resources", "/resources"],
  ["About", "/about"],
  ["Support", "/support"],
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  function handleKeyDown(event: React.KeyboardEvent<HTMLElement>) {
    if (event.key === "Escape" && open) {
      setOpen(false);
      menuButtonRef.current?.focus();
    }
  }

  return (
    <>
      <header className="header">
        <nav className="container nav" aria-label="Primary" onKeyDown={handleKeyDown}>
          <Link href="/" className="brand" aria-label="ExpertOnc home">
            <Image src="/brand/expertonc-logo.png" width={990} height={620} alt="ExpertOnc" priority />
          </Link>
          <div id="main-menu" className={`navlinks ${open ? "menuOpen" : ""}`}>
            {navigationItems.map(([label, href]) => (
              <Link
                key={href}
                href={href}
                aria-label={label}
                aria-current={pathname === href ? "page" : undefined}
                onClick={() => setOpen(false)}
              >
                <span className="navWord" aria-hidden="true">
                  {Array.from(label).map((letter, index) => (
                    <span
                      className="navLetter"
                      key={`${label}-${index}`}
                      style={{ "--nav-letter-delay": `${index * 24}ms` } as CSSProperties}
                    >
                      {letter}
                    </span>
                  ))}
                </span>
              </Link>
            ))}
          </div>
          <Link className="btn navCta" href="/download" aria-label={downloadLabel}>
            <span className="navWord" aria-hidden="true">
              {Array.from(downloadLabel).map((letter, index) => (
                <span
                  className="navLetter"
                  key={`cta-${index}`}
                  style={{ "--nav-letter-delay": `${index * 24}ms` } as CSSProperties}
                >
                  {letter === " " ? "\u00a0" : letter}
                </span>
              ))}
            </span>
          </Link>
          <button
            ref={menuButtonRef}
            type="button"
            className="mobileToggle"
            aria-expanded={open}
            aria-controls="main-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((isOpen) => !isOpen)}
          >
            {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </nav>
      </header>
      <div className="stickyMobile">
        <Link className="btn" href="/download">
          {downloadLabel}
        </Link>
      </div>
    </>
  );
}
