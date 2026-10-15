import type { Metadata } from "next";
import "@fontsource/figtree/400.css";
import "@fontsource/figtree/500.css";
import "@fontsource/figtree/600.css";
import "@fontsource/figtree/700.css";
import "@fontsource/figtree/800.css";
import "@fontsource/eb-garamond/400.css";
import "@fontsource/eb-garamond/400-italic.css";
import "@fontsource/eb-garamond/500.css";
import "@fontsource/jetbrains-mono/700.css";
import "./globals.css";
import "./home-motion.css";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ScrollToTop } from "@/components/scroll-to-top";
import { site } from "@/lib/config";
export const metadata: Metadata={metadataBase:new URL(site.url),title:{default:"ExpertOnc | Every visit, understood.",template:"%s | ExpertOnc"},description:site.description,alternates:{canonical:"/"},openGraph:{title:"ExpertOnc | Every visit, understood.",description:site.description,url:"/",siteName:"ExpertOnc",type:"website"},twitter:{card:"summary_large_image",title:"ExpertOnc",description:site.description},robots:{index:true,follow:true}};
export default function RootLayout({children}:{children:React.ReactNode}){const schema={"@context":"https://schema.org","@type":"SoftwareApplication",name:"ExpertOnc",applicationCategory:"HealthApplication",operatingSystem:"iOS, Android",description:site.description,url:`${site.url}/download`};return <html lang="en" data-scroll-behavior="smooth"><body><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema).replace(/</g,"\\u003c")}}/><a className="skip" href="#main">Skip to content</a><ScrollToTop/><Header/><main id="main">{children}</main><Footer/></body></html>}
