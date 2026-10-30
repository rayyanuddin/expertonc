import type{Metadata}from"next";import{Phone}from"@/components/phone";
import { AccentLastWord } from "@/components/accent-last-word";
export const metadata:Metadata={title:"Features",description:"Explore the current and confirmation-pending capabilities described for ExpertOnc.",alternates:{canonical:"/features"}};
const items=[
 ["Visit recording","Record a consultation only after consent is reviewed.","/screens/record.jpg","confirmed"],
 ["AI visit summary","Organize key points, next steps, and a treatment-plan summary for review.","/screens/summary.jpg","confirmed"],
 ["Visits list","Keep upcoming appointments and previous visits organized.","/screens/home.jpg","prototype"],
 ["AI assistant","Ask questions grounded in care information; it does not replace the oncology team.","/screens/summary.jpg","prototype"],
 ["Daily care plan","Track treatment progress, hydration, exercise, diet, medications, symptoms, and journal tasks.","/screens/treatment.jpg","confirmed"],
 ["Caregiver invitations","Invite a caregiver and control what is shared.","/screens/home.jpg","pending"],
 ["PDF export","Export appropriate visit information as a PDF.","/screens/summary.jpg","pending"],
 ["Reminders and notifications","Organize upcoming appointments, tests, medications, and daily targets.","/screens/home.jpg","prototype"],
 ["Nutrition and Supplements","Log food and supplements and retain who recommended them.","/screens/treatment.jpg","prototype"],
 ["Exercise","Track activity targets as part of the daily plan.","/screens/treatment.jpg","confirmed"],
 ["Daily journal","Record daily notes and how you feel.","/screens/treatment.jpg","confirmed"]] as const;
export default function Features(){return <><section className="pageHero"><div className="container"><p className="kicker">Product tour</p><h1>Built around the care <span className="titleAccent titleAccentBright">journey.</span></h1><p className="lede">Current screenshots and source code support the features marked confirmed. Prototype and pending items require release verification.</p></div></section><section className="section"><div className="container featureIndex">{items.map(([title,copy,src,state])=><article className="featureItem" key={title}><Phone src={src} alt={`ExpertOnc screen relevant to ${title}`}/><div><span className="statusPill">{state==="confirmed"?"Shown in current supplied app":"Awaiting production confirmation"}</span><h2><AccentLastWord text={title}/></h2><p className="lede">{copy}</p>{state!=="confirmed"?<p className="notice">Do not market as released until the client confirms the production build and behavior.</p>:null}</div></article>)}</div></section></>}
