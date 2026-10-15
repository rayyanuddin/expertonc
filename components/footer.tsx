import Link from "next/link";
import { disclaimer } from "@/lib/config";
import { FooterWordmark } from "@/components/footer-wordmark";

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <nav className="footerGrid" aria-label="Footer navigation">
          <FooterCol title="App" links={[["Features", "/features"], ["Download", "/download"]]} />
          <FooterCol title="Resources" links={[["All resources", "/resources"], ["Education library", "/resources#education"]]} />
          <FooterCol title="Company" links={[["About", "/about"], ["Support", "/support"]]} />
          <FooterCol title="Legal" links={[["Privacy", "/privacy"], ["Terms", "/terms"]]} />
        </nav>

        <FooterWordmark />

        <div className="footerBottom">
          <p className="tiny">{disclaimer}</p>
          <div className="footerLegal">
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: string[][] }) {
  return (
    <div>
      <strong>{title}</strong>
      {links.map(([label, href]) => (
        <Link key={href} href={href}>
          {label}
        </Link>
      ))}
    </div>
  );
}
