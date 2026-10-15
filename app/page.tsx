import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, HeartHandshake } from "lucide-react";
import { FAQ } from "@/components/faq";
import { Phone } from "@/components/phone";
import { RecordingFlow } from "@/components/recording-flow";
import { disclaimer, downloadLabel } from "@/lib/config";

export const metadata: Metadata = {
  title: "Every visit, understood.",
  description:
    "Record oncology appointments with consent, review AI-generated summaries, organize daily care, and find trusted resources with ExpertOnc.",
  alternates: { canonical: "/" },
};

const stories = [
  {
    title: "Record your visit",
    copy: "Focus on the conversation while ExpertOnc captures the details.",
    src: "/screens/record.jpg",
    alt: "ExpertOnc Record consultation screen",
    bullets: [
      "Consent first, then one tap to record",
      "Suggested questions during a consultation",
      "Key points, next steps, and treatment-plan summary",
    ],
  },
  {
    title: "Your daily care plan",
    copy: "Turn the plan from your visit into clear steps for each day.",
    src: "/screens/treatment.jpg",
    alt: "ExpertOnc treatment and daily targets screen",
    bullets: [
      "Medications, hydration, diet, exercise, and journal in one checklist",
      "Symptom logging for care-team review",
      "Supplements show who recommended them",
    ],
  },
  {
    title: "Trusted resources",
    copy: "Find source-attributed guidance without searching across the web.",
    src: "/screens/resources.jpg",
    alt: "ExpertOnc evidence-based resources screen",
    bullets: [
      "Guides from ACS, NCI, and Cancer Research UK",
      "A seven-lesson education library",
      "Cancer centers and support services",
    ],
  },
];

const steps = [
  ["Record", "With everyone’s consent, capture the consultation."],
  ["Understand", "Review an AI-generated summary, key points, and next steps."],
  ["Stay on track", "Use the daily plan to organize what comes next."],
];

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="container heroGrid">
          <div className="heroIntro">
            <h1>
              Every visit, <span>understood.</span>
            </h1>
            <p>
              Record your oncology appointments and get a clear summary, next
              steps, and a daily plan you can actually follow.
            </p>
            <Link className="btn" href="/download">
              {downloadLabel}
              <ArrowRight size={18} />
            </Link>
            <p className="tagline">Expert guidance. Every step of the way.</p>
          </div>
          <div className="heroShowcase">
            <div className="demo" aria-label="Transcript to AI summary example">
              <div className="demoCard">
                <strong>Visit transcript</strong>
                <p className="tiny">
                  “We reviewed how treatment is going, recent results, and your
                  next labs…”
                </p>
              </div>
              <span className="demoArrow" aria-hidden="true">
                <span className="waveform">
                  {[1, 2, 3, 4, 5].map((bar) => (
                    <i key={bar} />
                  ))}
                </span>
                <ArrowRight size={20} />
              </span>
              <div className="demoCard">
                <strong>Clear AI summary</strong>
                <p className="tiny">
                  Key points, next steps, and treatment plan organized for
                  review.
                </p>
              </div>
            </div>
            <Phone
              src="/screens/home.jpg"
              alt="ExpertOnc Home screen showing today's care plan"
              orb
            />
          </div>
        </div>
      </section>

      <section className="resourceStrip" aria-labelledby="resources-from">
        <div className="container">
          <h2 id="resources-from" style={{ fontSize: 22, textAlign: "center" }}>
            Resources from
          </h2>
          <div className="resourceMarquee">
            <div className="names">
              <span>American Cancer Society</span>
              <span>National Cancer Institute</span>
              <span>Cancer Research UK</span>
              <span>Case Comprehensive Cancer Center</span>
              <span>University Hospitals Seidman Cancer Center</span>
              <span>Ohio Neuroendocrine Tumor Society</span>
            </div>
          </div>
          <p className="tiny resourceDisclaimer">{disclaimer}</p>
        </div>
      </section>

      {stories.map((story, index) => (
        <section
          className={`section featureStory ${index % 2 === 0 ? "white" : ""}`}
          key={story.title}
        >
          <div className={`container feature ${index === 1 ? "reverse" : ""}`}>
            <div className="media screenStage">
              {index === 0 ? (
                <RecordingFlow />
              ) : (
                <Phone src={story.src} alt={story.alt} />
              )}
            </div>
            <div>
              <span className="kicker">{String(index + 1).padStart(2, "0")}</span>
              <h2>{story.title}</h2>
              <p className="lede">{story.copy}</p>
              <ul>
                {story.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
              <Link className="btn" href={index === 2 ? "/resources" : "/download"}>
                {index === 2 ? "Explore resources" : downloadLabel}
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </section>
      ))}

      <section className="section storySection">
        <div className="container">
          <span className="kicker">How it works</span>
          <h2>Three clear steps.</h2>
          <div className="storyProgress" aria-hidden="true">
            <span />
          </div>
          <div className="steps">
            {steps.map(([title, description], index) => (
              <div className="step" key={title}>
                <span className="num">0{index + 1}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section dark">
        <div className="container feature">
          <div>
            <span className="kicker">Privacy</span>
            <h2>Your health information stays yours.</h2>
            <p className="lede">
              These four promises are supplied in the brief and must be
              verified against the production app and infrastructure before
              launch.
            </p>
            <Link className="btn" href="/privacy">
              View privacy draft
            </Link>
          </div>
          <div className="promiseGrid">
            {[
              "Nothing recorded without consent",
              "Encrypted and never sold",
              "You control sharing",
              "Deletion capability",
            ].map((promise) => (
              <div className="promise" key={promise}>
                <span className="pending">Verification pending</span>
                <h3>{promise}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section white">
        <div className="container feature">
          <div>
            <HeartHandshake size={44} color="#1877D2" />
            <h2>For caregivers</h2>
            <p className="lede">
              ExpertOnc is intended to help patients and caregivers stay
              organized around appointments, care plans, and trusted
              information.
            </p>
            <div className="notice">
              <strong>Capability confirmation needed.</strong> Caregiver
              invitations, direct sharing, and PDF export appear in the brief
              or prototype UI, but production behavior has not been verified.
            </div>
          </div>
          <div className="screenStage">
            <Phone src="/screens/summary.jpg" alt="ExpertOnc AI visit summary screen" />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <span className="kicker">Testimonials</span>
          <h2>Real experiences belong here.</h2>
          <div className="notice">
            Not published: permissioned testimonials, names, ratings, and
            outcomes have not been supplied.
          </div>
        </div>
      </section>

      <section className="section white">
        <div className="container">
          <span className="kicker">FAQ</span>
          <h2 style={{ textAlign: "center" }}>Questions, answered carefully.</h2>
          <FAQ />
        </div>
      </section>

      <section className="section">
        <div className="container ctaBand">
          <div>
            <h2>Bring clarity to the next visit.</h2>
            <p>Join the early-access list while official store listings are pending.</p>
          </div>
          <Link className="btn secondary" href="/download">
            {downloadLabel}
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </>
  );
}
