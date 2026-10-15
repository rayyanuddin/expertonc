export const site = {
  name: "ExpertOnc",
  tagline: "Expert guidance. Every step of the way.",
  description: "ExpertOnc helps cancer patients and caregivers organize oncology visits, summaries, daily care plans, and trusted resources.",
  url: process.env.PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  launched: process.env.APP_LAUNCHED === "true" || process.env.NEXT_PUBLIC_APP_LAUNCHED === "true",
  ios: process.env.IOS_STORE_URL || "",
  android: process.env.ANDROID_STORE_URL || "",
} as const;
export const appIsLive = site.launched && Boolean(site.ios && site.android);
export const downloadLabel = appIsLive ? "Get the app" : "Get early access";
export const disclaimer = "Organisations and resources are displayed as provided; inclusion does not state a formal affiliation or endorsement. ExpertOnc does not provide medical advice. Always follow your care team's guidance.";
